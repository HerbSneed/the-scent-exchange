const User = require('./models/User');
const Venue = require('./models/Venue');
const DJ = require('./models/DJ');
const Playlist = require('./models/Playlist');
const UpvoteFee = require('./models/UpvoteFee');
const PaymentMethod = require('./models/PaymentMethod');
const Song = require('./models/Songs');

const resolvers = {
  Query: {
    // Example query for fetching all users
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        throw new Error('Failed to fetch users');
      }
    },

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

    // Example query for fetching all venues
    venues: async () => {
      try {
        const venues = await Venue.find();
        return venues;
      } catch (err) {
        throw new Error('Failed to fetch venues');
      }
    },

    // Example query for fetching a single venue by ID
    venue: async (_, { id }) => {
      try {
        const venue = await Venue.findById(id);
        if (!venue) {
          throw new Error('Venue not found');
        }
        return venue;
      } catch (err) {
        throw new Error('Failed to fetch venue');
      }
    },

    // Add more queries as needed for other models
  },

  Mutation: {
    // Example mutation for creating a new user
    createUser: async (_, { userInput }) => {
      try {
        const newUser = new User({
          firstName: userInput.firstName,
          lastName: userInput.lastName,
          userName: userInput.userName,
          email: userInput.email,
          userImage: userInput.userImage,
          qrCodeToken: userInput.qrCodeToken,
          stripeCustomerId: userInput.stripeCustomerId,
        });
        const result = await newUser.save();
        return result;
      } catch (err) {
        throw new Error('Failed to create user');
      }
    },

    // Example mutation for updating a user
    updateUser: async (_, { id, userInput }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, userInput, { new: true });
        if (!updatedUser) {
          throw new Error('User not found');
        }
        return updatedUser;
      } catch (err) {
        throw new Error('Failed to update user');
      }
    },

    // Example mutation for deleting a user
    deleteUser: async (_, { id }) => {
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
          throw new Error('User not found');
        }
        return deletedUser;
      } catch (err) {
        throw new Error('Failed to delete user');
      }
    },

    // Add more mutations as needed for other models
  },

  // Resolvers for relationships between types
  Venue: {
    djinfo: async (parent) => {
      try {
        const dj = await DJ.findById(parent.djinfo);
        return dj;
      } catch (err) {
        throw new Error('Failed to fetch DJ for venue');
      }
    },
    paymentMethod: async (parent) => {
      try {
        const paymentMethod = await PaymentMethod.findById(parent.paymentMethod);
        return paymentMethod;
      } catch (err) {
        throw new Error('Failed to fetch payment method for venue');
      }
    },
  },

  DJ: {
    paymentMethod: async (parent) => {
      try {
        const paymentMethod = await PaymentMethod.findById(parent.paymentMethod);
        return paymentMethod;
      } catch (err) {
        throw new Error('Failed to fetch payment method for DJ');
      }
    },
  },

  Playlist: {
    songs: async (parent) => {
      try {
        const songs = await Song.find({ _id: { $in: parent.songs } });
        return songs;
      } catch (err) {
        throw new Error('Failed to fetch songs for playlist');
      }
    },
  },

  // Add more resolvers for relationships between other types
};

module.exports = resolvers;
