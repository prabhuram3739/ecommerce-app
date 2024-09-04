const asyncHandler = require('express-async-handler');
const Product = require('../models/product');

const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const product = await Product.create({ name, description, price, stock });
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};

// @desc    Get all products with search and filter
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const { name, minPrice, maxPrice, available } = req.query;

  const filter = {};

  if (name) filter.name = { $regex: name, $options: 'i' };
  if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || Number.MAX_VALUE };
  if (available) filter.stock = { $gt: 0 };

  const products = await Product.find(filter);
  res.json(products);
});

module.exports = { getAllProducts, createProduct };
