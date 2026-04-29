import { inject, Injectable } from '@angular/core';
import { ArticlesStorage } from './articles-storage';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Article } from '../models/types/articles';
import { FormData } from '../models/types/form-data';

@Injectable({
  providedIn: 'root',
})
export class ArticleStorageService {
  private storage = inject(ArticlesStorage);

  constructor(private http: HttpClient) {
    this.getArticlesFromFile();
  }

  public addArticle(article: Article) {
    const articles: Article[] = [article, ...this.storage.articleStorage()];
    this.storage.setArticleStorage(articles);
  }

  public removeArticle(id: string) {
    const articles: Article[] = [...this.storage.articleStorage()];
    this.storage.setArticleStorage(articles.filter((article) => article.id !== id));
  }

  public updateArticle(data: FormData) {
    const articles: Article[] = [...this.storage.articleStorage()];
    this.storage.setArticleStorage(
      articles.map((article) => {
        return article.id === data.id ? { ...article, ...data } : article;
      }),
    );
  }

  public getArticlesFromFile() {
    this.http
      .get('./assets/data/articles.json')
      .pipe(map((data: any) => data.articles))
      .subscribe((data: Article[]) => this.storage.changeId(data));
  }
}
