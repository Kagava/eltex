export type Article = {
  id: number;
  title: string;
  date: string;
  dateFormatted: string;
  description: string;
  image: string;
  category: string;
};

export type ObjArticles = {
  articles: Article[];
};
