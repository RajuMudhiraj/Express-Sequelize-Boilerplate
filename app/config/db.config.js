module.exports = {
  development: {
    username: process.env.dev_db_username,
    password: process.env.dev_db_password,
    database: process.env.dev_db_database,
    host: process.env.dev_db_host,
    dialect: process.env.dev_db_dialect,
  },
  test: {
    username: process.env.test_db_username,
    password: process.env.test_db_password,
    database: process.env.test_db_database,
    host: process.env.test_db_host,
    dialect: process.env.test_db_dialect,
  },
  production: {
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    host: process.env.db_host,
    dialect: process.env.db_dialect,
  },
};
