require('dotenv').config();

const express = require('express');
const app = express();

const httpError = require('http-errors');

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Swagger UI setup
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc')
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Model project",
            version: "1.0.0",
            description: "Api documentation"
        },
        servers: [
            {
                url: "http://localhost:5000/"
            }
        ],
    },
    apis: ["./app/routes/*/*.js"],
}
const specs = swaggerJsDoc(options)
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// All routes are defined in index file of Rooutes folder
app.use('/', require('./app/routes/index'));

// Creating an error and passing through next() if requested router not found
app.use((req, res, next) => {
    const error = new httpError(404, "Could not find this route.");
    next(error)
});

// Sending error message to client
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message

    })
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, (err, res) => {
    if (err) {
        console.log(err + "")
    }
    else {
        console.log(`Server is listening at port ${PORT}`)
    }
})