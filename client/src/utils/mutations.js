import { gql } from "@apollo/client";

// Mutation to login a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      currentUser {
        email
        firstName
        lastName
        _id
        userDefaultNews
      }
      token
    }
  }
`;

// Mutation to register a new user
export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $userDefaultNews: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      userDefaultNews: $userDefaultNews
    ) {
      currentUser {
        firstName
        lastName
      }
      token
    }
  }
`;

// Mutation to save news for a user
export const SAVE_NEWS = gql`
  mutation saveNews($saveNews: NewsInput!) {
    saveNews(saveNews: $saveNews) {
      currentUser {
        _id
        email
        savedNews {
          newsId
          title
          summary
          source_country
          url
          image
          language
          latest_publish_date
        }
      }
      token
    }
  }
`;

// Mutation to delete news for a user
export const DELETE_NEWS = gql`
  mutation deleteNews($newsId: ID!) {
    deleteNews(newsId: $newsId) {
      _id
      email
      savedNews {
        newsId
        title
        summary
        source_country
        url
        image
        language
        latest_publish_date
      }
    }
  }
`;

// Mutation to initiate the password reset process
export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      success
      message
    }
  }
`;

// Mutation to reset the user's password
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;