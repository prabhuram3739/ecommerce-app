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
  // Extract the filter options from query parameters
  const { name, minPrice, maxPrice, available } = req.query;

  // Create an object to hold the filter criteria
  const filter = {};

  // Set filters for product name, price range, and stock availability
  if (name) filter.name = { [Sequelize.Op.iLike]: `%${name}%` }; // Adjust for Sequelize syntax
  if (minPrice || maxPrice) filter.price = { 
    [Sequelize.Op.gte]: minPrice || 0, 
    [Sequelize.Op.lte]: maxPrice || Number.MAX_VALUE 
  };
  if (available) filter.stock = { [Sequelize.Op.gt]: 0 };

  // Query the products table based on the filter criteria
  const products = await Product.findAll({ where: filter });

  // Send the resulting product list as a response
  res.json(products);
});

module.exports = { getAllProducts, createProduct };
