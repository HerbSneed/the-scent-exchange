const express = require('express');
const ProductController = require('../controllers/ProductController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);

module.exports = router;