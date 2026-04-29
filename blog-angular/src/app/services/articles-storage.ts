import { Injectable, signal, WritableSignal } from '@angular/core';
import { Article } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStorage {
  #articleStorage: WritableSignal<Article[]> = signal<Article[]>([]);
  public articleStorage = this.#articleStorage.asReadonly();

  public changeId(data: Article[]) {
    const dataId = data.map((article) => ({ ...article, id: crypto.randomUUID() }));
    this.setArticleStorage(dataId);
  }

  public setArticleStorage(data: Article[]) {
    this.#articleStorage.set(data);
  }
}
