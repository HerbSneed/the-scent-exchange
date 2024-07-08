// server/models/Product.js
const { Schema, model } = require("mongoose");

const productSchema = new Schema({
    ownerId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    ratings: [{ userId: String, rating: Number, comment: String }],
});

const Product = model("Product", productSchema);

module.exports = Product;