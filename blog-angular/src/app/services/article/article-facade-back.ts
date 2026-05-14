import { computed, DestroyRef, inject, Injectable } from '@angular/core';
import { ArticleStorage } from './article-srotage';
import { Article, backArticle, Comment, CommentBack } from '../../models/types/articles';
import { forkJoin, map, Observable, switchMap, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from '../../tokens/article-local-storage-service';
import { FormDataComment } from '../../models/types/form-data-comment';
import { CreateArticle } from '../../utils/create-article';
import { IArticleFacade } from '../../models/interfaces/article-facade';
import { HttpClient } from '@angular/common/http';
import { categoriesBack } from '../../models/types/category';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacadeBack implements IArticleFacade {
  private destroyRef = inject(DestroyRef);
  private articleStorage = inject(ArticleStorage);
  private currentId = computed(() => this.articleStorage.articleInfo()?.id);
  private articleStorageService = inject(ARTICLE_LOCAL_STORAGE_SERVICE);
  private categories: categoriesBack[] = [];

  constructor(private http: HttpClient) {}

  public updateArticle(rating: number) {
    this.updateArticleRatingBack(rating)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.getArticelFromBack(this.currentId()!)),
        map((data: any[]) => [
          this.makeGoodTypeArticle(data[0]),
          this.makeGoodTypeComment(data[1]),
        ]),
        map((data: any[]) => this.mergeArticleComment(data[0], data[1])),
        tap((data) => console.log(data)),
      )
      .subscribe((article: Article) => this.articleStorage.setArticleInfo(article));
  }

  public updateArticleComments(id: number, ratingDelta: number) {
    this.updateArticleCommentsStorage(id, ratingDelta)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => {
        this.articleStorageService.updateRating(article);
      });
  }

  public addComment(data: FormDataComment) {
    this.addCommetBack(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.getArticelFromBack(this.currentId()!)),
        map((data: any[]) => [
          this.makeGoodTypeArticle(data[0]),
          this.makeGoodTypeComment(data[1]),
        ]),
        map((data: any[]) => this.mergeArticleComment(data[0], data[1])),
      )
      .subscribe((article: Article) => this.articleStorage.setArticleInfo(article));
  }

  public getArticle(id: string) {
    this.loadCategories()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((categories: categoriesBack[]) => {
          this.categories = categories;
          return this.getArticelFromBack(id);
        }),
        map((data: any[]) => [
          this.makeGoodTypeArticle(data[0]),
          this.makeGoodTypeComment(data[1]),
        ]),
        map((data: any[]) => this.mergeArticleComment(data[0], data[1])),
      )
      .subscribe((article: Article) => this.articleStorage.setArticleInfo(article));
  }

  private getArticelFromBack(id: string) {
    return forkJoin([
      this.http.get(`/api/articles/${id}`),
      this.http.get(`/api/comments/article/${id}`),
    ]);
  }

  private updateArticleCommentsStorage(id: number, ratingDelta: number) {
    return new Observable<Article>((observer) => {
      const currentArticle = this.articleStorage.articleInfo();
      if (currentArticle) {
        try {
          const articleComments = currentArticle.comments;
          articleComments[id].commentRating += ratingDelta;
          const changedArticle: Article = { ...currentArticle, comments: articleComments };
          this.articleStorage.setArticleInfo(changedArticle);
          observer.next(changedArticle);
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.complete();
    });
  }

  private addCommetBack(data: FormDataComment) {
    return this.http.post('/api/comments', {
      username: data.name,
      content: data.comment,
      articleId: this.currentId(),
    });
  }

  private updateArticleRatingBack(rating: number) {
    if (rating === 1) {
      return this.http.patch(`/api/articles/${this.currentId()}/rating-up`, {});
    } else {
      return this.http.patch(`/api/articles/${this.currentId()}/rating-down`, {});
    }
  }

  private mergeArticleComment(article: Article, comment: Comment[]) {
    return { ...article, comments: comment };
  }

  private loadCategories() {
    return this.http.get('/api/categories').pipe(map((item) => item as categoriesBack[]));
  }

  private makeGoodTypeArticle(data: backArticle): Article {
    const outDate = CreateArticle.findCurrentData(new Date(data.updatedAt));
    return {
      id: data.id,
      title: data.title,
      date: outDate[0],
      dateFormatted: outDate[1],
      description: data.content,
      image: data.imgSrc ?? '/assets/article-foto.png',
      category: this.findCategoryFromId(data.categoryId),
      articleRating: data.rating,
      comments: [],
    } as Article;
  }

  private makeGoodTypeComment(data: CommentBack[]) {
    return data.map((item) => {
      return {
        name: item.username,
        commentText: item.content,
        commentRating: item.rating,
        date: item.createdAt,
        image: '/assets/mock-comm.jpg',
      } as Comment;
    });
  }

  private findCategoryFromId(categoryId: string): string {
    for (const category of this.categories) {
      if (category.id === categoryId) {
        return `${category.name}-article`;
      }
    }
    return '';
  }
}
