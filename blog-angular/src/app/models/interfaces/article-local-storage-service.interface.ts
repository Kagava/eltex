import { Article, createArticle } from '../types/articles';
import { articleFormData } from '../types/form-data';

export interface IArticleLocalStorageService {
  addArticle(article: createArticle): void;
  removeArticle(id: string): void;
  updateArticle(data: articleFormData): void;
  updateRating(article: Article): void;
}
