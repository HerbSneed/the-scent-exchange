// server/controllers/ProductController.js
const Product = require('../models/Product');

module.exports = {
    createProduct: async (parent, { productInput }, context) => {
            if (!context.user) {
                throw new AuthenticationError("User not authenticated");
            }
            const product = await Product.create({
                ...productInput,
                ownerId: context.user._id,
            });
            const updatedUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { userProducts: product._id } },
                { new: true, runValidators: true }
            );
            const token = signToken(updatedUser);
            return { token, currentUser: updatedUser };
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
