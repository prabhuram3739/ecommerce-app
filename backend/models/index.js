const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: 'postgres',
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
