import { Injectable } from '@angular/core';
import { Article, ObjArticles } from '../models/types/articles';

@Injectable({
  providedIn: 'root',
})
export class LoadArticles {
  public async loadDataFromJson(url: string) {
    const respons = await fetch(url);
    const data: ObjArticles = await respons.json();
    return data;
  }
}
