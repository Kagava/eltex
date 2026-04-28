import { Injectable, signal, WritableSignal } from '@angular/core';
import { Article } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStorage {
  #articleStorage: WritableSignal<Article[]> = signal<Article[]>([]);
  public articleStorage = this.#articleStorage.asReadonly();

  public setAritlceStorageIds(data: Article[]) {
    data.forEach((article) => (article.id = crypto.randomUUID()));
    this.setArticleStorage(data);
  }

  public setArticleStorage(data: Article[]) {
    this.#articleStorage.set(data);
  }
}
