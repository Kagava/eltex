import { Injectable, signal, WritableSignal } from '@angular/core';
import { Article } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStorage {
  #articleStorage: WritableSignal<Article[]> = signal<Article[]>([]);
  public articleStorage = this.#articleStorage.asReadonly();

  public setArticleStorage(data: Article[]) {
    this.#articleStorage.set(data);
  }

  #mainPage: WritableSignal<number> = signal<number>(0);
  public mainPage = this.#mainPage.asReadonly();

  public incrementMainPage() {
    this.#mainPage.update((value) => value + 1);
  }

  public decrementMainPage() {
    this.#mainPage.update((value) => value - 1);
  }
}
