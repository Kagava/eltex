import { DestroyRef, inject, Injectable } from '@angular/core';
import { ArticleStorage } from './article-srotage';
import { Article, backArticle, Comment } from '../../models/types/articles';
import { map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from '../../tokens/article-local-storage-service';
import { FormDataComment } from '../../models/types/form-data-comment';
import { CreateArticle } from '../../utils/create-article';
import { IArticleFacade } from '../../models/interfaces/article-facade';
import { LC_KEY_ARTICLES } from '../../constans/localStotageConstants';
import { HttpClient } from '@angular/common/http';
import { categoriesBack } from '../../models/types/category';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacadeBack implements IArticleFacade {
  private destroyRef = inject(DestroyRef);
  private articleStorage = inject(ArticleStorage);
  private articleStorageService = inject(ARTICLE_LOCAL_STORAGE_SERVICE);
  private categories: categoriesBack[] = [];

  constructor(private http: HttpClient) {}

  public updateArticle(rating: number) {
    this.updateArticleStorage(rating)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => {
        this.articleStorageService.updateRating(article);
      });
  }

  public updateArticleComments(id: number, ratingDelta: number) {
    this.updateArticleCommentsStorage(id, ratingDelta)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => {
        this.articleStorageService.updateRating(article);
      });
  }

  public addComment(data: FormDataComment) {
    this.addCommentLc(data)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => {
        this.articleStorageService.updateRating(article);
      });
  }
  public getArticle(id: string) {
    this.loadCategories()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap((categories: categoriesBack[]) => {
          this.categories = categories;
          return this.getArticelFromBack(id);
        }),
        map((data: any) => this.makeGoodType(data)),
        tap((article: Article) => this.articleStorage.setArticleInfo(article)),
      )
      .subscribe();
  }

  private getArticelFromBack(id: string) {
    return this.http.get(`/api/articles/${id}`);
  }

  private updateArticleStorage(rating: number) {
    return new Observable<Article>((observer) => {
      const currentArticle = this.articleStorage.articleInfo();
      if (currentArticle) {
        try {
          const changedArticle: Article = { ...currentArticle, articleRating: rating };
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

  private addCommentLc(data: FormDataComment) {
    return new Observable<Article>((observer) => {
      const currentArticle = this.articleStorage.articleInfo();
      if (currentArticle) {
        try {
          const changedArticle = currentArticle;
          changedArticle.comments.push({
            commentRating: 0,
            commentText: data.comment,
            name: data.name,
            date: CreateArticle.findShortData(),
            image: '../blog/assets/mock-comm.jpg',
          } as Comment);
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

  private loadCategories() {
    return this.http.get('/api/categories').pipe(map((item) => item as categoriesBack[]));
  }

  private makeGoodType(data: backArticle): Article {
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

  private findCategoryFromId(categoryId: string): string {
    for (const category of this.categories) {
      if (category.id === categoryId) {
        return `${category.name}-article`;
      }
    }
    return '';
  }
}
