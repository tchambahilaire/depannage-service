const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'depannage_db',
  process.env.DB_USER || 'app_user',
  process.env.DB_PASSWORD || 'depannage123',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: false
  }
);

module.exports = { sequelize };
