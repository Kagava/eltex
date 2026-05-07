import { Article } from '../types/articles';

export interface IArticleRepository {
  getArticle(id: string): void;
  updateArticle(article: Article): void;
}
