const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const User = require('./user');
const Product = require('./product');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'Pending',
  },
});

Order.belongsTo(User);
Order.belongsTo(Product);

module.exports = Order;
