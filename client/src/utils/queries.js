import { gql } from "@apollo/client";

// Query to get current user's information
export const QUERY_CURRENT_USER = gql`
  query getCurrentUser($email: String!) {
    currentUser(email: $email) {
      _id
      email
      userName
      profilePicture
      userProducts {
        _id
        productBrand
        productName
        concentration
        gender
        description
        productURL
        image 
        bottleSize 
        decantSize
        price
        trade
      }
    }
  }
`;

// Query to get product


