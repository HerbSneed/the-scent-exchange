// Import mongoose module for MongoDB connection
const mongoose = require('mongoose');

// Connect to MongoDB A
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/the-movie-app');

// Export the database connection
module.exports = mongoose.connection;
