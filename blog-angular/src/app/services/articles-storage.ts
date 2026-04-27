import { Injectable, signal, WritableSignal } from '@angular/core';
import { Article } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticlesStorage {
  public articleStorage: WritableSignal<Article[]> = signal<Article[]>([]);

  public setArticleSrotage(somevalue: any) {
    this.articleStorage.set(somevalue);
  }
}
