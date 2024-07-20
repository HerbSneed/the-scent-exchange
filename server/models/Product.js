// server/models/Product.js
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    ownerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    productName: { 
        type: String, 
        required: true 
    },

    gender: {
        type: String,
        required: true,
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String,
        required: true,
    },
    bottle: {
        type: Boolean,
        required: true 
    },
    bottleSize: {
        type: String,
        required: false
    },
    decant: {
        type: Boolean,
        required: true
    },
    decantSize: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    trade: {
        type: Boolean,
        required: true,
    },
    productRating: {
        type: Schema.Types.ObjectId,
        ref: 'ProductRating'
    }
}, { timestamps: true });

const Product = model("Product", productSchema);

module.exports = Product;