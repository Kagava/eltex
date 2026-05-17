import {
  CommentBack,
  Comment,
  BackArticle,
  Article,
  CreateArticle,
} from '../models/types/articles';
import { CategoriesBack } from '../models/types/category';
import { CreateArticleHelper } from './create-article-helper';

export class BackHelper {
  constructor() {}

  public static findCategoryFromId(categoryId: string, categories: CategoriesBack[]): string {
    for (const category of categories) {
      if (category.id === categoryId) {
        return `${category.name}-article`;
      }
    }
    return '';
  }

  public static findCategoryFromName(name: string, categories: CategoriesBack[]): string {
    for (const category of categories) {
      if (category.name === name.slice(0, name.length - 8)) {
        return category.id;
      }
    }
    return name;
  }

  public static makeGoodTypeComment(data: CommentBack[]) {
    return data.map((item) => {
      return {
        name: item.username,
        commentText: item.content,
        commentRating: item.rating,
        date: item.createdAt,
        image: '/assets/mock-comm.jpg',
      } as Comment;
    });
  }

  public static makeGoodTypeArticle(data: BackArticle, categories: CategoriesBack[]): Article {
    const outDate = CreateArticleHelper.findCurrentData(new Date(data.updatedAt));
    return {
      id: data.id,
      title: data.title,
      date: outDate[0],
      dateFormatted: outDate[1],
      description: data.content,
      image: data.imgSrc ?? '/assets/article-foto.png',
      category: BackHelper.findCategoryFromId(data.categoryId, categories),
      articleRating: data.rating,
      comments: [],
    } as Article;
  }

  public static makeGoodTypeArticles(data: BackArticle[], categories: CategoriesBack[]): Article[] {
    return data.map((article: BackArticle) => {
      const outDate = CreateArticleHelper.findCurrentData(new Date(article.updatedAt));
      return {
        id: article.id,
        title: article.title,
        date: outDate[0],
        dateFormatted: outDate[1],
        description: article.content,
        image: article.imgSrc ?? '/assets/article-foto.png',
        category: BackHelper.findCategoryFromId(article.categoryId, categories),
        articleRating: article.rating,
        comments: [],
      } as Article;
    });
  }

  public static prepareArticleForBack(article: CreateArticle, categories: CategoriesBack[]) {
    return {
      categoryId: BackHelper.findCategoryFromName(article.category, categories),
      content: article.description,
      createdAt: article.date,
      id: article.id,
      imgSrc: article.image ?? '',
      rating: article.articleRating,
      title: article.title,
      updatedAt: article.date,
    } as BackArticle;
  }
}
