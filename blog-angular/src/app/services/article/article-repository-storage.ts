import { effect, inject, Injectable } from '@angular/core';
import { ArticleSrotage } from './article-srotage';
import { ArticlesStorage } from '../articles-storage';
import { Article } from '../../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleRepositoryStorage {
  private articleSrotage = inject(ArticleSrotage);
  private storage = inject(ArticlesStorage);

  private articlesStorage = this.storage.articleStorage;

  protected currentArticle: Article | null = null;

  public getArticle(id: string) {
    for (let article of this.articlesStorage()) {
      if (article.id === id) {
        this.articleSrotage.setArticleInfo(article);
      }
    }
  }
}
