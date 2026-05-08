export interface IArticleRepository {
  getArticle(id: string): void;
  updateArticle(rating: number): void;
  updateArticleComments(id: number, ratingChange: number): void;
}
