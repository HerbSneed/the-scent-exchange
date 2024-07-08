const typeDefs = `#graphql

type User {
  _id: ID!
  email: String!
  userName: String!
  password: String!
  profilePicture: String
  ratings: [Rating] # Assuming ratings is an array of Rating objects
}

type Rating {
  userId: String
  rating: Float
  comment: String
}

type Auth {
  token: String!
  currentUser: User
}

# Query type definition
type Query {
  currentUser(email: String!): User
  user(id: ID!): User
}

# Mutation type definition
type Mutation {
  registerUser(email: String!, userName: String!, password: String!, profilePicture: String ): Auth
  login(email: String!, password: String!): Auth
}
`;

module.exports = typeDefs;



