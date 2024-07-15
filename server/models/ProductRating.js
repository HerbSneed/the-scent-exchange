const { Schema, model } = require("mongoose");

const ProductRatingSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: false
    }
}, { timestamps: true });

const ProductRating = model('ProductRating', ProductRatingSchema);
module.exports = ProductRating;
