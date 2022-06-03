const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./db.config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: 0,
  logging: false,
  define: {
    freezeTableName: true,
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { sequelize };

(async () => {
  try {
    // await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    console.log('Successfully connected to Databbase!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
