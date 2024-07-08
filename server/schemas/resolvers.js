const User = require('../models/User');
const { signToken, AuthenticationError } = require("../utils");
const bcrypt = require('bcryptjs');


const resolvers = {

  Query: {
    currentUser: async (parent, { email }) => User.findOne({ email }),

    // Example query for fetching a single user by ID
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (err) {
        throw new Error('Failed to fetch user');
      }
    },

  },

  Mutation: {
    registerUser: async ( parent, { email, userName, password, profilePicture }) => {

      const user = await User.create({
        email,
        userName,
        password,
        profilePicture,
      });

      const token = signToken(user);

      return { token, currentUser: user };
    },

    login: async ( parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("User not found");
      }

      console.log('User password from database:', user.password);
      console.log('Password provided:', password);

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        throw new AuthenticationError('Incorrect pasword');
      }
      const token = signToken(user);

      return { token, currentUser: user};
    }
  },
};

module.exports = resolvers;