const User = require('./user');
const Order = require('./order');
const Product = require('./product');
const OrderItems = require('./orderItems');
const Cart = require('./cartModel');

// Define associations here
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// Set up many-to-many relationship between Order and Product through OrderItems
Order.belongsToMany(Product, { through: OrderItems, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderItems, foreignKey: 'productId' });

// Associations
Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Order, Product };
