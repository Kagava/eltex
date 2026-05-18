import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { ICategoryService } from '../models/interfaces/category-interface';
import { CategoryStorage } from './category-storage';
import { map, mergeMap, Observable, takeUntil, tap } from 'rxjs';
import { CategoriesBack } from '../models/types/category';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class CategoryBackService implements ICategoryService {
  private categoryStorage = inject(CategoryStorage);
  private destroyRef = inject(DestroyRef);
  constructor(private http: HttpClient) {
    this.getCategoriesFromBack()
      .pipe(takeUntilDestroyed(this.destroyRef), tap(console.log))
      .subscribe((categories: CategoriesBack[]) => this.categoryStorage.setCategory(categories));
  }

  public addCategory(categoryName: string): void {
    this.addCategoryBack(categoryName)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() => this.getCategoriesFromBack().pipe(takeUntilDestroyed(this.destroyRef))),
      )
      .subscribe((categories: CategoriesBack[]) => this.categoryStorage.setCategory(categories));
  }

  private getCategoriesFromBack() {
    return this.http.get<CategoriesBack[]>('/api/categories');
  }

  private addCategoryBack(category: string): Observable<CategoriesBack> {
    return this.http.post<CategoriesBack>('/api/categories', { name: category });
  }
}
