import { Article } from '../types/articles';
import { articleFormData } from '../types/form-data';

export interface IArticleLocalStorageService {
  addArticle(article: Article): void;
  removeArticle(id: string): void;
  updateArticle(data: articleFormData): void;
  updateRating(article: Article): void;
}
