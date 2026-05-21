import { Article, BackArticle, CommentBack, CreateArticle, Comment } from '../types/articles';
import { GqlArticle } from '../types/gql-resonse';

export interface IBackHelper {
  findCategoryFromId(categoryId: string): string;
  findCategoryFromName(name: string): string;
  makeGoodTypeComment(data: CommentBack[]): Comment[];
  makeGoodTypeArticle(data: BackArticle): Article;
  makeGoodTypeArticles(data: BackArticle[]): Article[];
  prepareArticleForBack(article: CreateArticle): BackArticle;
  makeFromGqlArticleToArticle(articleGql: GqlArticle): Article;
}
