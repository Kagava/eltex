import { CommentBack } from './articles';

export type GqlArticle = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  imgSrc: string;
  categoryId: string;
  rating: number;
  comments: CommentBack[];
};

export type GqlArticleResponse = {
  article: GqlArticle;
};
