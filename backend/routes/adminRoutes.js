// routes/adminRoutes.js
const express = require('express');
const { getAllOrders, manageProduct } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
// Admin: View all orders
router.get('/orders', getAllOrders);

// Admin: Manage product inventory
router.put('/product/:id', manageProduct);

module.exports = router;
