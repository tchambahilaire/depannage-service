const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('depannage_db','app_user','depannage123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idel: 10000
  }
 }
);

module.exports = { sequelize };
