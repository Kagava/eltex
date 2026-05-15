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
import { CreateArticle } from '../utils/create-article';
import { BackHelper } from '../utils/back-helper';

@Injectable()
export class ArticleBackStorageService implements IArticleLocalStorageService {
  private storage = inject(ArticlesStorage);
  private destroyRef = inject(DestroyRef);
  private categories: categoriesBack[] = [];

  constructor(private http: HttpClient) {
    this.loadCategories()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap((categories: categoriesBack[]) => {
          this.categories = categories;
          return this.getArticlesFromServer();
        }),
        map((data: any) => BackHelper.makeGoodTypeArticles(data.items, this.categories)),
        tap((articles: Article[]) => this.storage.setArticleStorage(articles)),
      )
      .subscribe();
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
    const preparedArticle = BackHelper.prepareArticleForBack(article, this.categories);
    this.addArticleBack(preparedArticle)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() =>
          this.getArticlesFromServer().pipe(
            takeUntilDestroyed(this.destroyRef),
            map((data: any) => BackHelper.makeGoodTypeArticles(data.items, this.categories)),
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
      formData.append('title', tempArticle.title);
      formData.append('content', tempArticle.content);
      formData.append('categoryId', tempArticle.categoryId);
      formData.append('image', tempArticle.imgSrc, tempArticle.imgSrc.name);
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
            map((data: any) => BackHelper.makeGoodTypeArticles(data.items, this.categories)),
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
            map((data: any) => BackHelper.makeGoodTypeArticles(data.items, this.categories)),
          ),
        ),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private updateArticleBack(data: articleFormData) {
    const newCategory = BackHelper.findCategoryFromName(data.category, this.categories);
    const image = data.foto;
    if (image) {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.description);
      formData.append('categoryId', newCategory);
      formData.append('image', image, image.name);
      return this.http.patch(`/api/articles/${data.id}`, formData);
    }
    return this.http.patch(`/api/articles/${data.id}`, {
      title: data.title,
      content: data.description,
      categoryId: newCategory,
      image: data.foto,
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
    return this.http.get('/api/articles?page=1&limit=999&cumulative=false');
  }

  private loadCategories() {
    return this.http.get('/api/categories').pipe(map((item) => item as categoriesBack[]));
  }
}
