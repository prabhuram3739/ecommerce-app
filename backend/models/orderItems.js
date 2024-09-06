// models/orderItems.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const OrderItems = sequelize.define('OrderItems', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = OrderItems;
