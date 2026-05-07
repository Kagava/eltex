import { destroyPlatform, DestroyRef, effect, inject, Injectable } from '@angular/core';
import { ArticleSrotage } from './article-srotage';
import { ArticlesStorage } from '../articles-storage';
import { Article } from '../../models/types/articles';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class ArticleRepositoryStorage {
  private destroyRef = inject(DestroyRef);
  private articleSrotage = inject(ArticleSrotage);
  private storage = inject(ArticlesStorage);

  private articlesStorage = this.storage.articleStorage;

  protected currentArticle: Article | null = null;

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
      } catch {
        console.error('THERE IS NO SUCH ARTICLE');
        observer.error();
      }
      observer.complete();
    });
  }
}
