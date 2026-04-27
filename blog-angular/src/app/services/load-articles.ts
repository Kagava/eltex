import { inject, Injectable } from '@angular/core';
import { Article, ObjArticles } from '../models/types/articles';
import { HttpClient } from '@angular/common/http';
import { map, Subscription } from 'rxjs';
import { ArticlesStorage } from './articles-storage';
@Injectable({
  providedIn: 'root',
})
export class LoadArticles {
  private storage = inject(ArticlesStorage);

  constructor(private http: HttpClient) {
    this.getArticlesFromFile();
  }

  public getArticlesFromFile() {
    this.http
      .get('./assets/data/articles.json')
      .pipe(map((data: any) => data.articles))
      .subscribe((data: Article[]) => this.storage.setArticleSrotage(data));
  }
}
