// routes/product.js
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');
const { authorize } = require('../middleware/auth');

// Get all products (accessible to both users and admin)
router.get('/', getProducts);

// Get product by ID (accessible to both users and admin)
router.get('/:id', getProductById);

// Create a new product (only accessible by admin)
router.post('/', authorize('admin'), createProduct);

// Update product (only accessible by admin)
router.put('/:id', authorize('admin'), updateProduct);

// Delete product (only accessible by admin)
router.delete('/:id', authorize('admin'), deleteProduct);

module.exports = router;
