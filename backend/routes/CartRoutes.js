const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/:userId', cartController.getCart); // Get cart items for a user
router.post('/add', cartController.addToCart); // Add product to cart
router.post('/remove', cartController.removeFromCart); // Remove product from cart

module.exports = router;
