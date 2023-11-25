module.exports = {
  development: {
    // Database credentials
    username: 'postgres',
    password: 'Sql@357',
    database: 'test',
    host: 'localhost',
    dialect: 'postgres',
    ssl: false,
    ssl_dialect_options: {},

    PORT: 3001,

    JWT_SECRET_KEY: 'qwerty12345',
    REFRESH_TOKEN_SECRET_KEY:
      '645gsf@)NQ6bg7d/ei1ere564ndfqrfsa%ERQER884rsd7g4',
  },
  test: {
    // Database credentials
    username: 'postgres',
    password: 'Sql@357',
    database: 'test',
    host: 'localhost',
    dialect: 'postgres',
    ssl: false,
    ssl_dialect_options: {},

    PORT: 3001,

    JWT_SECRET_KEY: 'qwerty5e12345',
    REFRESH_TOKEN_SECRET_KEY:
      '645gsf@)NQ6bg7qd/ei1ere564ndfqrfsa%ERQER884rtq%@%sg5sd7g4',
  },
  production: {
    // Database credentials
    username: 'postgres',
    password: 'Sql@357',
    database: 'test',
    host: 'localhost',
    dialect: 'postgres',
    ssl: false,
    ssl_dialect_options: {},

    PORT: 3001,

    JWT_SECRET_KEY: 'qwerty54a6er12345',
    REFRESH_TOKEN_SECRET_KEY:
      '645gsf@)NQ6bg7q ^ `,esdd/ei1ere564ndfqrfsa%ERQER884rtq%@%sg5sd7g4',
  },
};
