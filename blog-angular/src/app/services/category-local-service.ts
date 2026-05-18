import { DestroyRef, inject, Injectable } from '@angular/core';
import { ICategoryService } from '../models/interfaces/category-interface';
import { concatMap, Observable, tap } from 'rxjs';
import { CategoriesBack } from '../models/types/category';
import { LC_KEY_CATEGORIES } from '../constans/localStotageConstants';
import { CategoryStorage } from './category-storage';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class CategoryLocalService implements ICategoryService {
  private categoryStorage = inject(CategoryStorage);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.getCategoriesFromLc()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cateries: CategoriesBack[]) => this.categoryStorage.setCategory(cateries));
  }

  public addCategory(categoryName: string): Observable<CategoriesBack[]> {
    return this.addCategoryLc(categoryName).pipe(
      concatMap(() => {
        return this.getCategoriesFromLc();
      }),
      tap((cateries: CategoriesBack[]) => this.categoryStorage.setCategory(cateries)),
    );
  }

  private addCategoryLc(categoryName: string): Observable<void> {
    return new Observable<void>((observer) => {
      const categoriesLc = localStorage.getItem(LC_KEY_CATEGORIES);
      if (categoriesLc) {
        try {
          const newCategory: CategoriesBack[] = JSON.parse(categoriesLc);
          newCategory.push({ id: crypto.randomUUID(), name: categoryName });
          localStorage.setItem(LC_KEY_CATEGORIES, JSON.stringify(newCategory));
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.next();
      observer.complete();
    });
  }

  private getCategoriesFromLc(): Observable<CategoriesBack[]> {
    return new Observable<CategoriesBack[]>((observer) => {
      const categoriesLc = localStorage.getItem(LC_KEY_CATEGORIES);
      if (categoriesLc) {
        try {
          const parsedCategories: CategoriesBack[] = JSON.parse(categoriesLc);
          observer.next(parsedCategories);
        } catch (e) {
          console.error(e);
          observer.error();
        }
      } else {
        const tempCat = [
          { id: '1111', name: 'frontend' },
          { id: '2222', name: 'tennis' },
        ];
        localStorage.setItem(LC_KEY_CATEGORIES, JSON.stringify(tempCat));
        observer.next(tempCat);
      }

      observer.complete();
    });
  }
}
