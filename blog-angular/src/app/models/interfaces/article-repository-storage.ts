import { Article } from '../types/articles';

export interface IArticleRepository {
  findArticle(id: string): void;
}
