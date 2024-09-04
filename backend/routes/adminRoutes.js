// routes/adminRoutes.js
const express = require('express');
const { getAllOrders, manageProduct } = require('../controllers/adminController');
const { adminProtect } = require('../middleware/authMiddleware');
const router = express.Router();

// Admin: View all orders
router.get('/orders', adminProtect, getAllOrders);

// Admin: Manage product inventory
router.put('/product/:id', adminProtect, manageProduct);

module.exports = router;
