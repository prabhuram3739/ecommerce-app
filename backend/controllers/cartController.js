// controllers/cartController.js
const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Order = require('../models/order');
const Product = require('../models/product');
const OrderItems = require('../models/orderItems');
const User = require('../models/user'); // Added to fetch user details

// Add to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity, userId } = req.body;
  const product = await Product.findByPk(productId);

  if (!product || product.stock < quantity) {
    res.status(400);
    throw new Error('Product unavailable or insufficient stock');
  }

  // Check if the cart item already exists
  const existingCartItem = await Cart.findOne({
    where: { productId, userId }
  });

  if (existingCartItem) {
    // If it exists, update the quantity
    existingCartItem.quantity += quantity;
    await existingCartItem.save();
    return res.status(200).json({ message: 'Item quantity updated in cart' }); // Ensure only one response
  } else {
    try {
      const cartItem = await Cart.create({
        productId,
        quantity,
        userId
      });
      return res.status(201).json(cartItem); // Ensure only one response
    } catch (error) {
      console.error('Error creating cart item:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});


 // Get cart items function
const getCartItems = asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const cartItems = await Cart.findAll({
    where: { userId },
    include: [
      {
        model: Product,
        attributes: ['name', 'price'],
      },
      {
        model: User,
        attributes: ['username'],
      }
    ]
  });
  res.json(cartItems);
});

// @desc Checkout and create an order
// @route POST /api/checkout
// @access Private/User
const checkout = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // Find cart items for the user
  const cartItems = await Cart.findAll({ where: { userId }, include: Product });

  if (!cartItems.length) {
    res.status(400);
    throw new Error('Your cart is empty');
  }

  // Create a new order
  const order = await Order.create({
    userId,
    status: 'Pending',
  });

  // Add items to the order
  for (let item of cartItems) {
    await OrderItems.create({
      orderId: order.id,
      productId: item.product.id,
      quantity: item.quantity,
      price: item.product.price,
    });
  }

  // Clear the cart after checkout
  await Cart.destroy({ where: { userId } });

  res.status(201).json({ message: 'Order placed successfully!' });
});

module.exports = { addToCart, getCartItems, checkout };
