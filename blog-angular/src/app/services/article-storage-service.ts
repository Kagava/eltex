import { inject, Injectable } from '@angular/core';
import { ArticlesStorage } from './articles-storage';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Article } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleStorageService {
  private storage = inject(ArticlesStorage);

  constructor(private http: HttpClient) {
    this.getArticlesFromFile();
  }

  public removeArticle(id: string) {
    const articles: Article[] = [...this.storage.articleStorage()];
    console.log(articles);
    for (let i = 0; i < articles.length; i += 1) {
      if (articles[i].id === id) {
        articles.splice(i, 1);
      }
    }
    this.storage.setArticleStorage(articles);
  }

  public getArticlesFromFile() {
    this.http
      .get('./assets/data/articles.json')
      .pipe(map((data: any) => data.articles))
      .subscribe((data: Article[]) => this.storage.setAritlceStorageIds(data));
  }
}
