import { DestroyRef, inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable, tap } from 'rxjs';
import { GET_ARTICLE_GQL } from './helpers/gql-reqests';
import { GqlArticle, GqlArticleResponse } from '../models/types/gql-resonse';
import { IArticleFacade } from '../models/interfaces/article-facade';
import { FormDataComment } from '../models/types/form-data-comment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ArticleStorage } from './article/article-srotage';
import { Article } from '../models/types/articles';
import { BACK_HELPER } from '../tokens/helper-back-service-token';

@Injectable()
export class GraphqlService implements IArticleFacade {
  private apollo = inject(Apollo);
  private destroyRef = inject(DestroyRef);
  private articleStorage = inject(ArticleStorage);
  private backHelper = inject(BACK_HELPER);

  public getArticle(id: string) {
    this.getArticleFromBack(id)
      .pipe(
        map((response: GqlArticle) => {
          return this.backHelper.makeFromGqlArticleToArticle(response);
        }),
        tap((data: Article) => console.log(data)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: Article) => this.articleStorage.setArticleInfo(data));
    // .subscribe(console.log);
  }
  public updateArticle(rating: number): void {}

  public updateArticleComments(id: number, ratingChange: number): void {}

  public addComment(data: FormDataComment): void {}

  private getArticleFromBack(id: string): Observable<GqlArticle> {
    return this.apollo
      .query<GqlArticleResponse>({
        query: GET_ARTICLE_GQL,
        variables: {
          articelId: id,
        },
      })
      .pipe(
        map((data: Apollo.QueryResult<GqlArticleResponse>) => {
          if (!data.data) {
            throw new Error('ERROR');
          } else {
            return data.data?.article;
          }
        }),
      );
  }
}
