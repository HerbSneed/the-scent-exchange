const typeDefs = `#graphql

scalar Upload

type User {
  _id: ID!
  email: String!
  userName: String!
  profilePicture: String
  userProducts: [Product]
}

type Product {
  _id: ID!
  productBrand: String!
  productName: String!
  concentration: String!
  gender: String
  description: String!
  productURL: String
  image: String
  bottle: Boolean
  bottleSize: String
  decant: Boolean
  decantSize: String
  price: Float!
  trade: Boolean
  ownerId: User
}

input ProductInput {
  productName: String!
  productBrand: String!
  concentration: String!
  gender: String
  description: String!
  productURL: String
  image: String
  bottle: Boolean
  bottleSize: String
  decant: Boolean
  decantSize: String
  price: Float!
  trade: Boolean
}

type UserRating {
  _id: ID!
  raterId: [User]
  rating: Float
  comment: String
  userId: User
}

# Define ProductRating Type
type ProductRating {
  _id: ID!
  raterId: [User]
  rating: Float
  comment: String
  productId: Product
}


type Auth {
  token: String!
  currentUser: User
}

# Query type definition
type Query {
  currentUser(email: String!, profilePicture: String): User
  products: [Product]!
}

# Mutation type definition
type Mutation {
  registerUser(email: String!, userName: String!, password: String!, profilePicture: String!, imageFile: Upload): Auth
  login(email: String!, password: String!): Auth
  createProduct(productInput: ProductInput!, imageFile: Upload): Product
}
`;

module.exports = typeDefs;



