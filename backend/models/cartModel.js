const { DataTypes } = require('sequelize');
const sequelize = require('./index'); // Adjust path if necessary

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Products', // Name of the product model/table
      key: 'id',
    },
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Name of the user model/table
      key: 'id',
    },
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Cart;
