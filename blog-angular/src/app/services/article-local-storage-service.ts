import { DestroyRef, inject, Injectable } from '@angular/core';
import { ArticlesStorage } from './articles-storage';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap, Observable } from 'rxjs';
import { Article } from '../models/types/articles';
import { FormData } from '../models/types/form-data';
import { LC_KEY_ARTICLES } from '../constans/localStotageConstants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IArticleLocalStorageService } from '../models/interfaces/article-local-storage-service.interface';

@Injectable()
export class ArticleLocalStorageService implements IArticleLocalStorageService {
  private storage = inject(ArticlesStorage);
  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {
    const tempLc = localStorage.getItem(LC_KEY_ARTICLES);
    if (tempLc && tempLc !== '[]') {
      this.getArticlesFromLocalStotage()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
    } else {
      this.getArticlesFromFile();
    }
  }

  public updateRating(article: Article): void {
    this.updateRatingLc(article)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() => this.getArticlesFromLocalStotage()),
      )
      .subscribe((articles) => this.storage.setArticleStorage(articles));
  }

  public addArticle(article: Article) {
    this.addArticleLc(article)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() => {
          return this.getArticlesFromLocalStotage();
        }),
      )
      .subscribe((articles) => {
        this.storage.setArticleStorage(articles);
      });
  }

  private addArticleLc(article: Article) {
    return new Observable<void>((observer) => {
      const articlesLc = localStorage.getItem(LC_KEY_ARTICLES);
      if (articlesLc) {
        try {
          const articles: Article[] = JSON.parse(articlesLc) ?? [];
          const updatedList: Article[] = [article, ...articles];
          localStorage.setItem(LC_KEY_ARTICLES, JSON.stringify(updatedList));
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.next();
      observer.complete();
    });
  }

  public removeArticle(id: string) {
    this.removeArticleLc(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() => {
          return this.getArticlesFromLocalStotage();
        }),
      )
      .subscribe((articles) => this.storage.setArticleStorage(articles));
  }

  private removeArticleLc(id: string) {
    return new Observable<void>((observer) => {
      const articlesLs = localStorage.getItem(LC_KEY_ARTICLES);
      if (articlesLs) {
        try {
          const articles: Article[] = JSON.parse(articlesLs) ?? [];
          const removedList = articles.filter((article: Article) => {
            return article.id !== id;
          });
          localStorage.setItem(LC_KEY_ARTICLES, JSON.stringify(removedList));
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.next();
      observer.complete();
    });
  }

  public updateArticle(data: FormData) {
    this.updateArticleLc(data)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap(() => {
          return this.getArticlesFromLocalStotage();
        }),
      )
      .subscribe((articles: Article[]) => this.storage.setArticleStorage(articles));
  }

  private updateArticleLc(data: FormData) {
    return new Observable<void>((observer) => {
      const artilesLs = localStorage.getItem(LC_KEY_ARTICLES);
      if (artilesLs) {
        try {
          const articles = JSON.parse(artilesLs) ?? [];
          const updatedArticles = articles.map((article: Article) => {
            if (data.id !== article.id) {
              return article;
            } else {
              return { ...article, ...data };
            }
          });
          localStorage.setItem(LC_KEY_ARTICLES, JSON.stringify(updatedArticles));
        } catch (e) {
          console.error(e);
          observer.error();
        }
      }
      observer.next();
      observer.complete();
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

  private getArticlesFromFile() {
    this.http
      .get('./assets/data/articles.json')
      .pipe(map((data: any) => data.articles))
      .subscribe((data: Article[]) => {
        const dataId: Article[] = data.map((item: Article) => {
          return { ...item, id: crypto.randomUUID() };
        });
        this.storage.setArticleStorage(dataId);
        this.saveToLoacalStorage(dataId);
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

  private saveToLoacalStorage(data: Article[]) {
    localStorage.setItem(LC_KEY_ARTICLES, JSON.stringify(data));
  }
}
