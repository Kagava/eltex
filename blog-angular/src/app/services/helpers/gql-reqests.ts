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
