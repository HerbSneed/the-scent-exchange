const { Schema, model } = require("mongoose");

const UserRatingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    raterId: {
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

const UserRating = model('UserRating', UserRatingSchema);

module.exports = UserRating;
