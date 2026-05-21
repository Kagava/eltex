import { Article } from './articles';

export type NewArticle = {
  id: string;
  title: string;
  date: string;
  dateFormatted: string;
  description: string;
  image: string;
  categoryId: string;
  articleRating: number;
  comments: Comment[];
};

export type GqlArticleResponse = {
  article: NewArticle;
};
