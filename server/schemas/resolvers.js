const { User, Product, UserRating, ProductRating } = require('../models');
const { signToken, AuthenticationError } = require("../utils");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");

function generateResetToken() {
  return crypto.randomBytes(20).toString("hex");
}

const resolvers = {
  Query: {
    currentUser: async (parent, { email }) => {
      try {
        const user = await User.findOne({ email }).populate('userProducts');
        return user;
      } catch (error) {
        throw new Error(`Failed to fetch current user: ${error}`);
      }
    },
  },

  Mutation: {
    registerUser: async (parent, { email, userName, password, profilePicture }) => {
      const user = await User.create({
        email,
        userName,
        password,
        profilePicture,
      });
      const token = signToken(user);
      return { token, currentUser: user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("User not found");
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AuthenticationError('Incorrect password');
      }
      const token = signToken(user);
      return { token, currentUser: user };
    },

    createProduct: async (parent, { productInput }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }
      const product = await Product.create({
        ...productInput,
        ownerId: context.user._id,
      });
      const updatedUser = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { userProducts: product._id } },
        { new: true, runValidators: true }
      );
      const token = signToken(updatedUser);
      return { token, currentUser: updatedUser };
    },
  },
};

module.exports = resolvers;
