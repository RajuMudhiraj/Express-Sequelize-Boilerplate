const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'postgres',
  operatorsAliases: 0,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = { sequelize };

// Checking the connection to database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Successfully connected to Database!');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
})();

// Synchronising the whole database
// (async () => {
//   try {
//     const option = {};
//     await sequelize.sync(option);

//     const stringifiedOption = JSON.stringify(option);
//     console.log(`Successfully synchronised the database with ${stringifiedOption}`);
//   } catch (error) {
//     console.log('Unable to synchronise the database:', error);
//   }
// })();
