import { computed, DestroyRef, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ArticleStorage } from './article-srotage';
import { Article, Comment, CommentBack } from '../../models/types/articles';
import { FormDataComment } from '../../models/types/form-data-comment';
import { IArticleFacade } from '../../models/interfaces/article-facade';
import { categoriesBack } from '../../models/types/category';
import { BackHelper } from '../../utils/back-helper';

@Injectable({
  providedIn: 'root',
})
export class ArticleFacadeBack implements IArticleFacade {
  private destroyRef = inject(DestroyRef);
  private articleStorage = inject(ArticleStorage);
  private currentId = computed(() => this.articleStorage.articleInfo()?.id);
  private categories: categoriesBack[] = [];

  constructor(private http: HttpClient) {}

  public updateArticle(rating: number) {
    this.updateArticleRatingBack(rating)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.getArticelFromBack(this.currentId()!)),
        map((data: any[]) => [
          BackHelper.makeGoodTypeArticle(data[0], this.categories),
          BackHelper.makeGoodTypeComment(data[1]),
        ]),
        map((data: any[]) => this.mergeArticleComment(data[0], data[1])),
      )
      .subscribe((article: Article) => this.articleStorage.setArticleInfo(article));
  }

  public updateArticleComments(id: number, ratingDelta: number) {
    this.updateArticleCommentBack(id, ratingDelta)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.getArticelFromBack(this.currentId()!)),
        map((data: any[]) => [
          BackHelper.makeGoodTypeArticle(data[0], this.categories),
          BackHelper.makeGoodTypeComment(data[1]),
        ]),
        map((data: any[]) => this.mergeArticleComment(data[0], data[1])),
      )
      .subscribe((article: Article) => this.articleStorage.setArticleInfo(article));
  }

  public addComment(data: FormDataComment) {
    this.addCommetBack(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        switchMap(() => this.getArticelFromBack(this.currentId()!)),
        map((data: any[]) => [
          BackHelper.makeGoodTypeArticle(data[0], this.categories),
          BackHelper.makeGoodTypeComment(data[1]),
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
          BackHelper.makeGoodTypeArticle(data[0], this.categories),
          BackHelper.makeGoodTypeComment(data[1]),
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

  private updateArticleCommentBack(id: number, ratingDelta: number) {
    return this.http.get(`/api/comments/article/${this.currentId()}`).pipe(
      takeUntilDestroyed(this.destroyRef),
      map((data: any) => data as CommentBack[]),
      switchMap((data: CommentBack[]) => {
        return this.http.patch(`/api/comments/${data[id].id}/rating`, {
          rating: data[id].rating + ratingDelta,
        });
      }),
    );
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
}
