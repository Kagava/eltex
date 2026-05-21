import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { GET_ARTICLE_GQL } from './helpers/gql-reqests';
import { GqlArticleResponse, NewArticle } from '../models/types/gql-resonse';

@Injectable()
export class GraphqlService {
  private apollo = inject(Apollo);

  public getArticle(id: string): Observable<NewArticle> {
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
