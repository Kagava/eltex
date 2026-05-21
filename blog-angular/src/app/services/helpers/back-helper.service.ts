import { inject, Injectable } from '@angular/core';
import { CategoryStorage } from '../category-storage';
import {
  CommentBack,
  Comment,
  BackArticle,
  Article,
  CreateArticle,
} from '../../models/types/articles';
import { CreateArticleHelper } from '../../utils/create-article-helper';
import { GqlArticle } from '../../models/types/gql-resonse';

@Injectable()
export class BackHelperService {
  private categoriesStorage = inject(CategoryStorage);
  private categories = this.categoriesStorage.categoryStorage;

  constructor() {}

  public findCategoryFromId(categoryId: string): string {
    for (const category of this.categories()) {
      if (category.id === categoryId) {
        return `${category.name}`;
      }
    }
    return '';
  }

  public findCategoryFromName(name: string): string {
    for (const category of this.categories()) {
      if (category.name === name) {
        return category.id;
      }
    }
    return name;
  }

  public makeGoodTypeComment(data: CommentBack[]) {
    return data.map((item) => {
      return {
        id: item.id,
        name: item.username,
        commentText: item.content,
        commentRating: item.rating,
        date: item.createdAt,
        image: '/assets/mock-comm.jpg',
      } as Comment;
    });
  }

  public makeGoodTypeArticle(data: BackArticle): Article {
    const outDate = CreateArticleHelper.findCurrentData(new Date(data.updatedAt));
    return {
      id: data.id,
      title: data.title,
      date: outDate[0],
      dateFormatted: outDate[1],
      description: data.content,
      image: data.imgSrc ?? '/assets/article-foto.png',
      category: this.findCategoryFromId(data.categoryId),
      articleRating: data.rating,
      comments: [],
    } as Article;
  }

  public makeGoodTypeArticles(data: BackArticle[]): Article[] {
    return data.map((article: BackArticle) => {
      const outDate = CreateArticleHelper.findCurrentData(new Date(article.updatedAt));
      return {
        id: article.id,
        title: article.title,
        date: outDate[0],
        dateFormatted: outDate[1],
        description: article.content,
        image: article.imgSrc ?? '/assets/article-foto.png',
        category: this.findCategoryFromId(article.categoryId),
        articleRating: article.rating,
        comments: [],
      } as Article;
    });
  }

  public prepareArticleForBack(article: CreateArticle) {
    return {
      categoryId: this.findCategoryFromName(article.category),
      content: article.description,
      createdAt: article.date,
      id: article.id,
      imgSrc: article.image ?? '',
      rating: article.articleRating,
      title: article.title,
      updatedAt: article.date,
    } as BackArticle;
  }

  public makeFromGqlArticleToArticle(gqlArticel: GqlArticle): Article {
    const outDate = CreateArticleHelper.findCurrentData(new Date(gqlArticel.createdAt));
    return {
      id: gqlArticel.id,
      title: gqlArticel.title,
      date: outDate[0],
      dateFormatted: outDate[1],
      description: gqlArticel.content,
      image: gqlArticel.imgSrc,
      category: this.findCategoryFromId(gqlArticel.categoryId),
      articleRating: gqlArticel.rating,
      comments: this.makeGoodTypeComment(gqlArticel.comments),
    } as Article;
  }
}
