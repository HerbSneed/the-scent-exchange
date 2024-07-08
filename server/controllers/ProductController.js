// server/controllers/ProductController.js
const Product = require('../models/Product');

module.exports = {
    createProduct: async (req, res) => {
        const { ownerId, name, description, image, price } = req.body;
        try {
            const product = await Product.create({ ownerId, name, description, image, price });
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProducts: async (req, res) => {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: 'Product not found' });
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};
