// controllers/adminController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// @desc Get all orders
// @route GET /api/admin/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').populate('items.product');
  res.json(orders);
});

// @desc Update product inventory
// @route PUT /api/admin/product/:id
// @access Private/Admin
const manageProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, description } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name || product.name;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.description = description || product.description;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

module.exports = { getAllOrders, manageProduct };
