import { Injectable, signal, WritableSignal } from '@angular/core';
import { CategoriesBack } from '../models/types/category';

@Injectable()
export class CategoryStorage {
  #categorySorage: WritableSignal<CategoriesBack[]> = signal<CategoriesBack[]>([]);

  public readonly categoryStorage = this.#categorySorage.asReadonly();

  public setCategory(data: CategoriesBack[]) {
    this.#categorySorage.set(data);
  }
}
