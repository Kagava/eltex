import { DestroyRef, inject, Injectable } from '@angular/core';
import { ArticlesStorage } from './articles-storage';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable, tap } from 'rxjs';
import { Article, BackArticle, CreateArticle } from '../models/types/articles';
import { ArticleFormData } from '../models/types/form-data';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IArticleLocalStorageService } from '../models/interfaces/article-local-storage-service.interface';
import { CategoriesBack } from '../models/types/category';
import { CATEGORY_BACK_SERVICE } from '../tokens/category-storage-service-token';
import { CategoryStorage } from './category-storage';
import { BackHelperService } from './helpers/back-helper.service';
import { BACK_HELPER } from '../tokens/helper-back-service-token';

@Injectable()
export class ArticleBackStorageService implements Omit<
  IArticleLocalStorageService,
  'updateRating'
> {
  private storage = inject(ArticlesStorage);
  private destroyRef = inject(DestroyRef);
  private categoriesService = inject(CATEGORY_BACK_SERVICE);
  private categoriesStorage = inject(CategoryStorage);
  private categories = this.categoriesStorage.categoryStorage;
  private backHelper = inject(BACK_HELPER);

  constructor(private http: HttpClient) {
    this.getArticlesFromServer()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((data: any) => this.backHelper.makeGoodTypeArticles(data.items)),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  public addArticle(article: CreateArticle) {
    const preparedArticle = this.backHelper.prepareArticleForBack(article);
    if (this.checkCategories(article.category)) {
      this.addArticleBack(preparedArticle)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          mergeMap(() =>
            this.getArticlesFromServer().pipe(
              takeUntilDestroyed(this.destroyRef),
              map((data: any) => this.backHelper.makeGoodTypeArticles(data.items)),
            ),
          ),
        )
        .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
    } else {
      this.categoriesService
        .addCategory(article.category)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          mergeMap(() => {
            return this.addArticleBack(this.backHelper.prepareArticleForBack(article)).pipe(
              takeUntilDestroyed(this.destroyRef),
              mergeMap(() =>
                this.getArticlesFromServer().pipe(
                  takeUntilDestroyed(this.destroyRef),
                  map((data: any) => this.backHelper.makeGoodTypeArticles(data.items)),
                ),
              ),
            );
          }),
        )
        .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
    }
  }

  private addArticleBack(article: BackArticle): Observable<Object> {
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
            map((data: any) => this.backHelper.makeGoodTypeArticles(data.items)),
          ),
        ),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private removeArticleBack(id: string): Observable<Object> {
    return this.http.delete(`/api/articles/${id}`);
  }

  public updateArticle(data: ArticleFormData) {
    this.updateArticleBack(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() =>
          this.getArticlesFromServer().pipe(
            takeUntilDestroyed(this.destroyRef),
            map((data: any) => this.backHelper.makeGoodTypeArticles(data.items)),
          ),
        ),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private updateArticleBack(data: ArticleFormData): Observable<Object> {
    const newCategory = this.backHelper.findCategoryFromName(data.category);
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
    });
  }

  private getArticlesFromServer(): Observable<Object> {
    return this.http.get('/api/articles?page=1&limit=999&cumulative=false');
  }

  private loadCategories(): Observable<CategoriesBack[]> {
    return this.http.get('/api/categories').pipe(map((item) => item as CategoriesBack[]));
  }

  private checkCategories(category: string) {
    for (let tempCategory of this.categories()) {
      if (tempCategory.name === category) {
        return true;
      }
    }
    return false;
  }

  private createCategory(category: string) {
    return this.http.post('/api/categories', { name: category });
  }
}
