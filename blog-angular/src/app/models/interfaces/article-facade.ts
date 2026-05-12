import { FormDataComment } from '../types/form-data-comment';

export interface IArticleFacade {
  getArticle(id: string): void;
  updateArticle(rating: number): void;
  updateArticleComments(id: number, ratingChange: number): void;
  addComment(data: FormDataComment): void;
}
