const Product = require('../models/product');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};

exports.createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  try {
    const product = await Product.create({ name, description, price, stock });
    res.status(201).send(product);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};
