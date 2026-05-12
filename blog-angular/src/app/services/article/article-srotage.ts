import { Injectable, signal, WritableSignal } from '@angular/core';
import { Article, Comment } from '../../models/types/articles';

@Injectable()
export class ArticleStorage {
  #articleInfo: WritableSignal<Article | null> = signal<Article | null>(null);

  public articleInfo = this.#articleInfo.asReadonly();

  public setArticleInfo(data: Article) {
    this.#articleInfo.set(data);
  }

  #articleComments: WritableSignal<Comment[] | null> = signal<Comment[] | null>(null);
  public aritlceComments = this.#articleComments.asReadonly();

  public updateComments(data: Comment[]) {
    this.#articleComments.set(data);
  }
}
