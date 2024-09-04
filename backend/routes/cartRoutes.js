// routes/cartRoutes.js
const express = require('express');
const { addToCart, checkout, getOrderHistory } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Add product to cart
router.post('/add', protect, addToCart);

// Checkout
router.post('/checkout', protect, checkout);

// Get order history
router.get('/orders', protect, getOrderHistory);

module.exports = router;
