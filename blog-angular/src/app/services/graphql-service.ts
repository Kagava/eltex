import { computed, DestroyRef, inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { concatMap, map, Observable, tap } from 'rxjs';
import {
  ARTICLE_RATING_DOWN_GQL,
  ARTICLE_RATING_UP_GQL,
  CHANGE_RATING_COMMENT_GQL,
  CREATE_ARTICLE_GQL,
  GET_ARTICLE_GQL,
} from './helpers/gql-reqests';
import {
  GqlArticle,
  GqlArticleRatingDownResponse,
  GqlArticleRatingUpResponse,
  GqlArticleResponse,
  GqlCreateCommentResponse,
  GqlUpdateRatingCommentResponse,
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

  public updateArticleComments(id: number, ratingChange: number): void {
    this.updateArticleCommentsBack(id, ratingChange)
      .pipe(
        concatMap((id: string) => {
          return this.getArticleFromBack(id);
        }),
        map((gqlArticle: GqlArticle) => this.backHelper.makeFromGqlArticleToArticle(gqlArticle)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: Article) => this.articleStorage.setArticleInfo(data));
  }

  public addComment(data: FormDataComment): void {
    this.addCommentBack(data)
      .pipe(
        concatMap((id: string) => {
          return this.getArticleFromBack(id);
        }),
        map((gqlArticle: GqlArticle) => this.backHelper.makeFromGqlArticleToArticle(gqlArticle)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((data: Article) => this.articleStorage.setArticleInfo(data));
  }

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
          mutation: ARTICLE_RATING_DOWN_GQL,
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
          mutation: ARTICLE_RATING_UP_GQL,
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

  private addCommentBack(data: FormDataComment): Observable<string> {
    return this.apollo
      .mutate<GqlCreateCommentResponse>({
        mutation: CREATE_ARTICLE_GQL,
        variables: {
          articleId: this.currentId(),
          content: data.comment,
          username: data.name,
        },
      })
      .pipe(
        map((data: Apollo.MutateResult<GqlCreateCommentResponse>) => {
          if (!data.data) {
            throw new Error('ERROR CRETE ARTICLE');
          } else {
            return data.data.createComment.articleId;
          }
        }),
      );
  }

  private updateArticleCommentsBack(id: number, ratingChange: number): Observable<string> {
    const commnetId = this.articleStorage.articleInfo()?.comments[id].id;
    const commnetRating = this.articleStorage.articleInfo()?.comments[id].commentRating;
    return this.apollo
      .mutate<GqlUpdateRatingCommentResponse>({
        mutation: CHANGE_RATING_COMMENT_GQL,
        variables: {
          commentId: commnetId,
          rating: commnetRating! + ratingChange,
        },
      })
      .pipe(
        map((data: Apollo.MutateResult<GqlUpdateRatingCommentResponse>) => {
          if (!data.data) {
            throw new Error('ERROR UPDATE RATING');
          } else {
            return data.data.updateCommentRating.articleId;
          }
        }),
      );
  }
}
