const Order = require('../models/order');

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { UserId: req.user.id } });
    res.status(200).send(orders);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};

exports.createOrder = async (req, res) => {
  const { productId } = req.body;

  try {
    const order = await Order.create({ UserId: req.user.id, ProductId: productId });
    res.status(201).send(order);
  } catch (err) {
    res.status(500).send({ message: 'Server error' });
  }
};
