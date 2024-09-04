// controllers/cartController.js
const asyncHandler = require('express-async-handler');
const Cart = require('../models/cartModel');
const Order = require('../models/orders');
const Product = require('../models/products');

// Add to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);

  if (!product || product.stock < quantity) {
    res.status(400);
    throw new Error('Product unavailable or insufficient stock');
  }

   // Find the user's cart or create one if it doesn't exist
   let cart = await Cart.findOne({ user: req.user._id });
   if (!cart) {
     cart = await Cart.create({ user: req.user._id, items: [] });
   }
 
   // Add or update the product in the cart
   const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
   if (itemIndex >= 0) {
     cart.items[itemIndex].quantity += quantity;
   } else {
     cart.items.push({ product: productId, quantity });
   }
 
   await cart.save();
   res.status(201).json(cart);
 });

// Checkout
const checkout = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  
    if (!cart || cart.items.length === 0) {
      res.status(400);
      throw new Error('Cart is empty');
    }
  
    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));
  
    // Create the order
    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      total: orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0),
    });
  
    // Decrease product stock
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      product.stock -= item.quantity;
      await product.save();
    }
  
    // Clear the cart
    cart.items = [];
    await cart.save();
  
    res.status(201).json(order);
  });
  
  // @desc Get user's order history
  // @route GET /api/cart/orders
  // @access Private
  const getOrderHistory = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  });

module.exports = { addToCart, checkout, getOrderHistory };
