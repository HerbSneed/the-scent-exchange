const path = require('path');
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./middleware/auth');
const compression = require('compression');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,

});

const BASE_URL = process.env.NODE_ENV === 'production' ? '' : `http://localhost:${PORT}`;

app.use(compression());
app.use('/public', express.static(path.join(__dirname, 'client', 'dist')));

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // app.use('/api/users', userRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/user', userRoutes);

  app.use('/graphql', expressMiddleware(server, { context: authMiddleware }));


  db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });

  db.once('open', () => {
    console.log('Connected to MongoDB!');
    // Start Express server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at ${BASE_URL}/graphql`);
    });
  });

  // Close MongoDB connection on process exit
  process.on('SIGINT', () => {
    db.close(() => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
};

// Call function to start Apollo Server
startApolloServer();
