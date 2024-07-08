const { Schema, model } = require("mongoose");
const bcrypt = require('bcryptjs');

// Define User Schema
const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: false },
  ratings: [{ userId: String, rating: Number, comment: String }],
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }] // Reference to Product model
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Calculate average rating method
userSchema.methods.calculateAverageRating = function () {
  if (this.ratings.length === 0) return 0;

  const sum = this.ratings.reduce((total, rating) => total + rating.rating, 0);
  return sum / this.ratings.length;
};

// Create User model
const User = model("User", userSchema);

module.exports = User;
