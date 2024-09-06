// controllers/adminController.js
const asyncHandler = require('express-async-handler');
const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');

// @desc Get all orders
// @route GET /api/admin/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.findAll({
    include: [{ all: true }], // Check if this is correct; adjust the include options accordingly
  });
  res.json(orders);
});

// @desc Update product inventory
// @route PUT /api/admin/product/:id
// @access Private/Admin
const manageProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, description } = req.body;
  
  // Use findByPk to find the product by its primary key (id)
  const product = await Product.findByPk(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Update the product attributes
  product.name = name || product.name;
  product.price = price || product.price;
  product.stock = stock || product.stock;
  product.description = description || product.description;

  // Save the updated product
  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

module.exports = { getAllOrders, manageProduct };
