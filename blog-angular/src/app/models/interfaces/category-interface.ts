import { Observable } from 'rxjs';
import { CategoriesBack } from '../types/category';

export interface ICategoryService {
  addCategory(categoryName: string): Observable<CategoriesBack[]>;
}
