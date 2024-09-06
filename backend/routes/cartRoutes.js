// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCartItems, checkout } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', addToCart); // Add to cart
router.get('/cart', getCartItems); // Fetch cart items
router.post('/checkout', checkout); // Checkout and create an order

module.exports = router;
