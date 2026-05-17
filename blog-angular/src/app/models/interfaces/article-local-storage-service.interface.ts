import { Article, CreateArticle } from '../types/articles';
import { ArticleFormData } from '../types/form-data';

export interface IArticleLocalStorageService {
  addArticle(article: CreateArticle): void;
  removeArticle(id: string): void;
  updateArticle(data: ArticleFormData): void;
  updateRating(article: Article): void;
}
