export type Article = {
  id: string;
  title: string;
  date: string;
  dateFormatted: string;
  description: string;
  image: string;
  category: string;
  articleRating: number;
  comments: Comment[];
};

export type CreateArticle = {
  id: string;
  title: string;
  date: string;
  dateFormatted: string;
  description: string;
  image: File | undefined;
  category: string;
  articleRating: number;
  comments: Comment[];
};

export type CommentBack = {
  articleId: string;
  content: string;
  createdAt: string;
  id: string;
  rating: number;
  username: string;
};

export type Comment = {
  name: string;
  commentText: string;
  commentRating: number;
  date: string;
  image: string;
};

export type ObjArticles = {
  articles: Article[];
};

export type BackArticle = {
  categoryId: string;
  content: string;
  createdAt: string;
  id: string;
  imgSrc: File | string;
  rating: number;
  title: string;
  updatedAt: string;
};
