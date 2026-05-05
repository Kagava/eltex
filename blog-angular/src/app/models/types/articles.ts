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

export type Comment = {
  name: string;
  commentText: string;
  commentRating: number;
};

export type ObjArticles = {
  articles: Article[];
};
