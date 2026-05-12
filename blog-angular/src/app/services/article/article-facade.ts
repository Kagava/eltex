import { DestroyRef, inject, Injectable } from '@angular/core';
import { ArticleStorage } from './article-srotage';
import { ArticlesStorage } from '../articles-storage';
import { Article, Comment } from '../../models/types/articles';
import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ARTICLE_LOCAL_STORAGE_SERVICE } from '../../tokens/article-local-storage-service';
import { FormDataComment } from '../../models/types/form-data-comment';
import { CreateArticle } from '../create-article';
import { IArticleFacade } from '../../models/interfaces/article-facade';

@Injectable()
export class ArticleFacade implements IArticleFacade {
  private destroyRef = inject(DestroyRef);
  private articleStorage = inject(ArticleStorage);
  private storage = inject(ArticlesStorage);
  private articleStorageService = inject(ARTICLE_LOCAL_STORAGE_SERVICE);
  private articlesStorage = this.storage.articleStorage;
  private needData = inject(CreateArticle);

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
    this.getArticleFromStorage(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((article) => this.articleStorage.setArticleInfo(article));
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
            date: this.needData.findShortData(),
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
}
