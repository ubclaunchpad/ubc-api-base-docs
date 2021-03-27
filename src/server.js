const express = require('express');
const serverless = require('serverless-http');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UBC APIs documentation",
      version: "1.0.0",
      description:
        "This is a simple web app with Swagger API documentation for several APIs pertaining to UBC",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "UBC Launchpad",
        url: "https://ubclaunchpad.com",
        email: "admin@ubclaunchpad.com",
      },
    },
    host: "https://o1ox6y8yql.execute-api.us-east-2.amazonaws.com",
    basePath: '/test/',
    // servers: [
    //   {
    //     url: "https://o1ox6y8yql.execute-api.us-east-2.amazonaws.com/",
    //   },
    //   {
    //     url: "lol"
    //   }
    // ],
  },
  // apis: ["./routes/books.js"],
  apis: ['./config/documentation.yaml'],
};

const specs = swaggerJsdoc(options);

router.use('/books', require('./routes/books'));
router.use('/tester', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/.netlify/functions/server', router);

app.listen(PORT);
console.debug('Server listening on port: ' + PORT);

module.export = app;
module.exports.handler = serverless(app);
