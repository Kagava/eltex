import { DestroyRef, inject, Injectable } from '@angular/core';
import { ArticlesStorage } from './articles-storage';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { Article, backArticle, createArticle } from '../models/types/articles';
import { articleFormData } from '../models/types/form-data';
import { LC_KEY_ARTICLES } from '../constans/localStotageConstants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IArticleLocalStorageService } from '../models/interfaces/article-local-storage-service.interface';
import { categoriesBack } from '../models/types/category';

@Injectable()
export class ArticleBackStorageService implements IArticleLocalStorageService {
  private storage = inject(ArticlesStorage);
  private destroyRef = inject(DestroyRef);
  private categories: categoriesBack[] = [];

  constructor(private http: HttpClient) {
    this.loadCategories();
    this.getArticlesFromServer()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data: any) => this.makeGoodTypes(data.items)),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  public updateRating(article: Article): void {
    this.updateRatingLc(article)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() => this.getArticlesFromLocalStotage()),
      )
      .subscribe((articles) => this.storage.setArticleStorage(articles));
  }

  public addArticle(article: createArticle) {
    const preparedArticle = this.prepareArticleForBack(article);
    this.addArticleBack(preparedArticle)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() =>
          this.getArticlesFromServer().pipe(
            takeUntilDestroyed(this.destroyRef),
            map((data: any) => this.makeGoodTypes(data.items)),
          ),
        ),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private addArticleBack(article: backArticle) {
    const tempArticle = article;
    if (typeof tempArticle.imgSrc === 'string') {
      return this.http.post('/api/articles', article);
    } else {
      const formData = new FormData();
      formData.append('title', article.title!);
      formData.append('content', tempArticle.content!);
      formData.append('category', tempArticle.categoryId!);
      formData.append('image', tempArticle.imgSrc!, tempArticle.imgSrc!.name);
      return this.http.post('/api/articles', formData);
    }
  }

  public removeArticle(id: string) {
    this.removeArticleBack(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() =>
          this.getArticlesFromServer().pipe(
            takeUntilDestroyed(this.destroyRef),
            tap((data: any) => console.log(data)),
            map((data: any) => this.makeGoodTypes(data.items)),
          ),
        ),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private removeArticleBack(id: string) {
    return this.http.delete(`/api/articles/${id}`);
  }

  public updateArticle(data: articleFormData) {
    this.updateArticleBack(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((data: any) => console.log('Updated', data.id)),
        mergeMap(() =>
          this.getArticlesFromServer().pipe(
            takeUntilDestroyed(this.destroyRef),
            tap((data: any) => console.log(data)),
            map((data: any) => this.makeGoodTypes(data.items)),
          ),
        ),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private updateArticleBack(data: articleFormData) {
    const newCategory = this.findCategoryFromName(data.category);
    return this.http.patch(`/api/articles/${data.id}`, {
      title: data.title,
      content: data.description,
      categoryId: newCategory,
    });
  }

  private getArticlesFromLocalStotage() {
    return new Observable<Article[]>((observer) => {
      const articlesLc = localStorage.getItem(LC_KEY_ARTICLES);
      if (articlesLc) {
        try {
          const articles = JSON.parse(articlesLc);
          observer.next(articles);
        } catch (e) {
          console.error(e);
          observer.next([]);
        }
      }
      observer.complete();
    });
  }

  private updateRatingLc(article: Article) {
    return new Observable<void>((observer) => {
      const articlesLc = localStorage.getItem(LC_KEY_ARTICLES);
      if (articlesLc) {
        try {
          const articlesParsed = JSON.parse(articlesLc);
          articlesParsed.map((item: Article) => {
            if (item.id === article.id) {
              item.articleRating = article.articleRating;
              item.comments = article.comments;
            }
          });
          localStorage.setItem(LC_KEY_ARTICLES, JSON.stringify(articlesParsed));
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.next();
      observer.complete();
    });
  }

  private getArticlesFromServer() {
    return this.http.get('/api/articles');
  }

  private loadCategories() {
    this.http
      .get('/api/categories')
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((item) => item as categoriesBack[]),
      )
      .subscribe((data: categoriesBack[]) => {
        this.categories = data;
      });
  }

  private makeGoodTypes(data: backArticle[]): Article[] {
    return data.map((article: backArticle) => {
      return {
        id: article.id,
        title: article.title,
        date: article.updatedAt,
        dateFormatted: article.updatedAt,
        description: article.content,
        image: article.imgSrc ?? '/assets/article-foto.png',
        category: this.findCategoryFromId(article.categoryId),
        articleRating: article.rating,
        comments: [],
      } as Article;
    });
  }

  private findCategoryFromId(categoryId: string): string {
    for (const category of this.categories) {
      if (category.id === categoryId) {
        return `${category.name}-article`;
      }
    }
    return '';
  }

  private findCategoryFromName(name: string): string {
    for (const category of this.categories) {
      if (category.name === name.slice(0, name.length - 8)) {
        return category.id;
      }
    }
    return name;
  }

  private prepareArticleForBack(article: createArticle) {
    return {
      categoryId: this.findCategoryFromName(article.category),
      content: article.description,
      createdAt: article.date,
      id: article.id,
      imgSrc: article.image ?? '',
      rating: article.articleRating,
      title: article.title,
      updatedAt: article.date,
    } as backArticle;
  }
  /*
  categoryId: string;
  content: string;
  createdAt: string;
  id: string;
  imgSrc: null | string;
  rating: number;
  title: string;
  updatedAt: string;
  */
}
