var express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/books", require("./routes/books"));

const PORT = process.env.PORT || 3000;

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
app.use(
  "/tester",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.listen(PORT);

console.debug("Server listening on port: " + PORT);