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

    createProduct: async (parent, { productInput, imageFile }, context) => {
      if (!context.user) {
        throw new AuthenticationError("User not authenticated");
      }

      let imageUrl = null;
      try {
        if (imageFile) {
          // Assuming imageFile is a GraphQL Upload scalar
          const { createReadStream } = await imageFile;
          const stream = createReadStream();
          imageUrl = await uploadToCloudinary(stream); // Function to upload image to Cloudinary
        }

        // Create the new product
        const product = await Product.create({
          image: imageUrl,
          ...productInput,
          ownerId: context.user._id, // Ensure ownerId is set
        });

        // Update the user to include the new product in their list of products
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { userProducts: product._id } },
          { new: true, runValidators: true }
        );

        const token = signToken(updatedUser);

        return {
          token, 
          currentUser: updatedUser,  
          ...product.toObject(), 
          _id: product._id.toString()
        }
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
      }
    },
  }

};

module.exports = resolvers;
