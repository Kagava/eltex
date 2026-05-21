import { computed, DestroyRef, inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { concatMap, map, Observable } from 'rxjs';
import { ARTICLE_RATING_DOWN, ARTICLE_RATING_UP, GET_ARTICLE_GQL } from './helpers/gql-reqests';
import {
  GqlArticle,
  GqlArticleRatingDownResponse,
  GqlArticleRatingUpResponse,
  GqlArticleResponse,
} from '../models/types/gql-resonse';
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
  private currentId = computed(() => this.articleStorage.articleInfo()?.id);
  private backHelper = inject(BACK_HELPER);

  public getArticle(id: string) {
    this.getArticleFromBack(id)
      .pipe(
        map((response: GqlArticle) => {
          return this.backHelper.makeFromGqlArticleToArticle(response);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: Article) => this.articleStorage.setArticleInfo(data));
  }

  public updateArticle(rating: number): void {
    this.updateArticleBack(rating)
      .pipe(
        concatMap((id) => {
          return this.getArticleFromBack(id);
        }),
        map((gqlArticle: GqlArticle) => this.backHelper.makeFromGqlArticleToArticle(gqlArticle)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: Article) => this.articleStorage.setArticleInfo(data));
  }

  public updateArticleComments(id: number, ratingChange: number): void {}

  public addComment(data: FormDataComment): void {}

  private getArticleFromBack(id: string): Observable<GqlArticle> {
    return this.apollo
      .query<GqlArticleResponse>({
        query: GET_ARTICLE_GQL,
        variables: {
          articelId: id,
        },
        fetchPolicy: 'network-only',
      })
      .pipe(
        map((data: Apollo.QueryResult<GqlArticleResponse>) => {
          if (!data.data) {
            throw new Error('ERROR GET ARTICLE');
          } else {
            return data.data?.article;
          }
        }),
      );
  }

  private updateArticleBack(rating: number): Observable<string> {
    if (rating === -1) {
      return this.apollo
        .mutate<GqlArticleRatingDownResponse>({
          mutation: ARTICLE_RATING_DOWN,
          variables: {
            articleId: this.currentId(),
          },
        })
        .pipe(
          map((data: Apollo.MutateResult<GqlArticleRatingDownResponse>) => {
            if (!data.data) {
              throw new Error('ERROR DOWN ARTICLE RATING');
            } else {
              return data.data.articleRatingDown.id;
            }
          }),
        );
    } else {
      return this.apollo
        .mutate<GqlArticleRatingUpResponse>({
          mutation: ARTICLE_RATING_UP,
          variables: {
            articleId: this.currentId(),
          },
        })
        .pipe(
          map((data: Apollo.MutateResult<GqlArticleRatingUpResponse>) => {
            if (!data.data) {
              throw new Error('ERROR UP ARTICLE RATING');
            } else {
              return data.data.articleRatingUp.id;
            }
          }),
        );
    }
  }
}
