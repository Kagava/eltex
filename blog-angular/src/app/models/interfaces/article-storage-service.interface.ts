import { Article } from '../types/articles';
import { FormData } from '../types/form-data';

export interface IArticleStorageService {
  addArticle(article: Article): void;
  removeArticle(id: string): void;
  updateArticle(data: FormData): void;
  updateRating(article: Article): void;
}
