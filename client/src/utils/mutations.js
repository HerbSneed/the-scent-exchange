import { gql } from "@apollo/client";

// Mutation to login a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      currentUser {
        _id
        email
        userName
      }
    }
  }
`;

// Mutation to register a new user
export const REGISTER_USER = gql`
  mutation registerUser(
    $userName: String!
    $email: String!
    $password: String!
    $profilePicture: String
  ) {
    registerUser(
      userName: $userName
      email: $email
      password: $password
      profilePicture: $profilePicture
    ) {
      currentUser {
        email
      }
      token
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
