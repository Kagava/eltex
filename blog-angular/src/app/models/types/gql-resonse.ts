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

export type GqlArticleRatingUpResponse = {
  articleRatingUp: { id: string };
};

export type GqlArticleRatingDownResponse = {
  articleRatingDown: { id: string };
};

export type GqlCreateCommentResponse = {
  createComment: { articleId: string };
};
