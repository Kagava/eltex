import { CSP_NONCE, DestroyRef, inject, Injectable } from '@angular/core';
import { ArticleSrotage } from './article-srotage';
import { ArticlesStorage } from '../articles-storage';
import { Article, Comment } from '../../models/types/articles';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ARTICLE_STORAGE_SERVISE } from '../../tokens/article-storage-servic-token';

@Injectable()
export class ArticleRepositoryStorage {
  private destroyRef = inject(DestroyRef);
  private articleSrotage = inject(ArticleSrotage);
  private storage = inject(ArticlesStorage);
  private articleStorageService = inject(ARTICLE_STORAGE_SERVISE);
  private articlesStorage = this.storage.articleStorage;

  protected currentArticle: Article | null = null;

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
  public getArticle(id: string) {
    this.getArticleFromStorage(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => this.articleSrotage.setArticleInfo(article));
  }

  private getArticleFromStorage(id: string) {
    return new Observable<Article>((observer) => {
      try {
        for (let article of this.articlesStorage()) {
          if (article.id === id) {
            observer.next(article);
          }
        }
      } catch (e) {
        console.error(e);
        observer.error();
      }
      observer.complete();
    });
  }

  private updateArticleStorage(rating: number) {
    return new Observable<Article>((observer) => {
      const currentArticle = this.articleSrotage.articleInfo();
      if (currentArticle) {
        try {
          const changedArticle: Article = { ...currentArticle, articleRating: rating };
          this.articleSrotage.setArticleInfo(changedArticle);
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
      const currentArticle = this.articleSrotage.articleInfo();
      if (currentArticle) {
        try {
          const articleComments = currentArticle.comments;
          articleComments[id].commentRating += ratingDelta;
          const changedArticle: Article = { ...currentArticle, comments: articleComments };
          this.articleSrotage.setArticleInfo(changedArticle);
          observer.next(changedArticle);
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.complete();
    });
  }
}
