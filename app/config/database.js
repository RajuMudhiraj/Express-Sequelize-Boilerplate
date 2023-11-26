const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    ssl: config.ssl,
    dialectOptions: config.dialectOptions,
    operatorsAliases: 0,
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

module.exports = { sequelize, Sequelize };

// Checking the connection to database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to Database!');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
})();
