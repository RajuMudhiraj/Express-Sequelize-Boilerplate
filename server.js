require('dotenv').config();

const express = require('express');

const app = express();

const env = process.env.NODE_ENV;

const HttpError = require('http-errors');

const cors = require('cors');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// require('./app/models/index')

// Swagger UI setup
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const config = require('./app/config/config')[env];

const { PORT } = config;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Model project',
      version: '1.0.0',
      description: 'Api documentation',
      contact: {
        email: 'yoursupportemail@email.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/`,
      },
    ],
  },
  apis: ['./app/routes/*/*.js'],
};
const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

// All routes are defined in index file of Rooutes folder
app.use('/', require('./app/routes/index'));

// Creating an error and passing through next() if requested router not found
app.use((req, res, next) => {
  const error = new HttpError(404, 'Could not find this route.');
  next(error);
});

// Sending error message to client
app.use((error, req, res) =>
  res.status(error.status || 500).json({
    message: error.message,
  })
);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`${err}`);
  } else {
    console.log(`Server is listening at port ${PORT}.....`);
  }
});
