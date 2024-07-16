const typeDefs = `#graphql

type User {
  _id: ID
  email: String
  userName: String
  password: String
  profilePicture: String
  userProducts: [Product]
}

type Product {
  _id: ID
  ownerId: User
  productName: String
  gender: String
  description: String
  image: String
  bottle: Boolean
  bottleSize: String
  decant: Boolean
  decantSize: String
  price: Float
  trade: Boolean
}

input ProductInput {
  productName: String
  gender: String
  description: String
  image: String
  bottle: Boolean
  bottleSize: String
  decant: Boolean
  decantSize: String
  price: Float
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
  currentUser(email: String!): User
}

# Mutation type definition
type Mutation {
  registerUser(email: String!, userName: String!, password: String!, profilePicture: String ): Auth
  login(email: String!, password: String!): Auth
  createProduct(productInput: ProductInput!): Product
}
`;

module.exports = typeDefs;



