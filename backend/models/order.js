// models/orderModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Product = require('./product'); // Import the Product model if necessary
const User = require('./user'); // Import the User model if necessary

const Order = sequelize.define('Order', {
  // Define your attributes here
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
});
Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsToMany(Product, { through: 'OrderItems' });
Product.belongsToMany(Order, { through: 'OrderItems' });


module.exports = Order;
