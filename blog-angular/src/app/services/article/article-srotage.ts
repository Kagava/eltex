import { Injectable, signal, WritableSignal } from '@angular/core';
import { Article } from '../../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class ArticleSrotage {
  #articleInfo: WritableSignal<Article | null> = signal<Article | null>(null);

  public articleInfo = this.#articleInfo.asReadonly();

  public setArticleInfo(data: Article) {
    this.#articleInfo.set(data);
  }
}
