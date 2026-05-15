import {
  CommentBack,
  Comment,
  backArticle,
  Article,
  createArticle,
} from '../models/types/articles';
import { categoriesBack } from '../models/types/category';
import { CreateArticle } from './create-article';

export class BackHelper {
  constructor() {}

  public static findCategoryFromId(categoryId: string, categories: categoriesBack[]): string {
    for (const category of categories) {
      if (category.id === categoryId) {
        return `${category.name}-article`;
      }
    }
    return '';
  }

  public static findCategoryFromName(name: string, categories: categoriesBack[]): string {
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

  public static makeGoodTypesArticle(data: backArticle[], categories: categoriesBack[]): Article[] {
    return data.map((article: backArticle) => {
      const outDate = CreateArticle.findCurrentData(new Date(article.updatedAt));
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

  public static prepareArticleForBack(article: createArticle, categories: categoriesBack[]) {
    return {
      categoryId: BackHelper.findCategoryFromName(article.category, categories),
      content: article.description,
      createdAt: article.date,
      id: article.id,
      imgSrc: article.image ?? '',
      rating: article.articleRating,
      title: article.title,
      updatedAt: article.date,
    } as backArticle;
  }
}
