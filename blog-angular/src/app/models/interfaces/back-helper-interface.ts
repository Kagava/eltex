import { Article, BackArticle, CommentBack, CreateArticle, Comment } from '../types/articles';

export interface IBackHelper {
  findCategoryFromId(categoryId: string): string;
  findCategoryFromName(name: string): string;
  makeGoodTypeComment(data: CommentBack[]): Comment[];
  makeGoodTypeArticle(data: BackArticle): Article;
  makeGoodTypeArticles(data: BackArticle[]): Article[];
  prepareArticleForBack(article: CreateArticle): BackArticle;
}
