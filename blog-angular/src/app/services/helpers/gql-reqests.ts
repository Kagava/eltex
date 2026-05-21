import { gql } from 'apollo-angular';

export const GET_ARTICLE_GQL = gql`
  query CommentsByArticle($articelId: ID!) {
    article(id: $articelId) {
      createdAt
      id
      rating
      imgSrc
      title
      content
      categoryId
      comments {
        articleId
        content
        createdAt
        id
        rating
        username
      }
    }
  }
`;

export const ARTICLE_RATING_UP = gql`
  mutation ArticleRatingUp($articleId: ID!) {
    articleRatingUp(id: $articleId) {
      id
    }
  }
`;

export const ARTICLE_RATING_DOWN = gql`
  mutation ArticleRatingDown($articleId: ID!) {
    articleRatingDown(id: $articleId) {
      id
    }
  }
`;
