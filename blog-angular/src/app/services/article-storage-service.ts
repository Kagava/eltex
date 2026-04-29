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
    this.storage.setArticleStorage(articles.filter((article) => article.id !== id));
  }

  public getArticlesFromFile() {
    this.http
      .get('./assets/data/articles.json')
      .pipe(map((data: any) => data.articles))
      .subscribe((data: Article[]) => this.storage.changeId(data));
  }
}
