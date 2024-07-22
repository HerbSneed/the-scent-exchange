const { User, Product, UserRating, ProductRating } = require('../models');
const { signToken, AuthenticationError } = require("../utils");
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const { uploadToCloudinary } = require('../utils/helpers');

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

    products: async (parent, { userName }) => {
      const params = userName ? { userName } : {};
      return await Product.find(params).populate('ownerId');
    }
  },


  Product: {
    ownerId: async (product) => {
      return await User.findById(product.ownerId);
    }
  },



  Mutation: {
    registerUser: async (parent, { email, userName, password, profilePicture, imageFile }) => {

      let imageUrl = profilePicture;
      try {
        if (imageFile) {
          const { createReadStream } = await imageFile;
          const stream = createReadStream();
          imageUrl = await uploadToCloudinary(stream, "profile");
        }

        const user = await User.create({
          profilePicture: imageUrl,
          email,
          userName,
          password,
          
        });

        const token = signToken(user);
        return { token, currentUser: user };
      } catch (error) {
        console.error("Error creating User:", error);
        throw new Error("Failed to create user");
      }
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

    createProduct: async (parent, { productInput, imageFile }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }

      let imageUrl = null;
      try {
        if (imageFile) {
          const { createReadStream } = await imageFile;
          const stream = createReadStream();
          imageUrl = await uploadToCloudinary(stream, "product");
        }

        const product = await Product.create({
          image: imageUrl,
          ...productInput,
          ownerId: context.user._id,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { userProducts: product._id } },
          { new: true, runValidators: true }
        );

        const token = signToken(context.user);

        return {
          token,
          currentUser: context.user,
          ...product.toObject(),
          _id: product._id.toString()
        };
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
      }
    },
  },
};

module.exports = resolvers;
