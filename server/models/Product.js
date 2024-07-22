// server/models/Product.js
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    ownerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    productBrand: {
        type: String,
        required: true
    },

    productName: { 
        type: String, 
        required: true 
    },

    concentration: {
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
    productURL: {
        type: String,
        required: false
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