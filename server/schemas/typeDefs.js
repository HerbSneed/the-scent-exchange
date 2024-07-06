# DJ type definition
type DJ {
  _id: ID!
  firstName: String!
  lastName: String!
  email: String!
  userName: String
  percentage: Float
  paymentMethod: PaymentMethod
}

# PaymentMethod type definition
type PaymentMethod {
  _id: ID!
  method: String!
  cardNumber: String
  cardExpiration: Int
  venmo: String
  cashApp: String
}

# Playlist type definition
type Playlist {
  _id: ID!
  playlistTitle: String!
  songs: [Song]
}

# Song type definition
type Song {
  _id: ID!
  title: String!
  artist: String!
  genre: String!
  played: Int!
  upvotes: Int
}

# UpvoteFee type definition
type UpvoteFee {
  _id: ID!
  upvoteFee: Boolean!
  upvotePrice: Float!
  upvotePriceControl: String!
}

# User type definition
type User {
  _id: ID!
  firstName: String
  lastName: String
  userName: String!
  email: String!
  userImage: String
  qrCodeToken: String
  upvotedSongs: [Song]
  stripeCustomerId: String
}

# Venue type definition
type Venue {
  _id: ID!
  venue: String!
  address: String
  city: String!
  state_province: String!
  newsId: String!
  url: String!
  image: String
  language: String
  dj: Boolean
  djinfo: DJ
  musicGenres: [String!]!
  paymentMethod: PaymentMethod
}

# Query type definition
type Query {
  # Define your queries here
}

# Mutation type definition
type Mutation {
  # Define your mutations here
}

# Schema definition
schema {
  query: Query
  mutation: Mutation
}
