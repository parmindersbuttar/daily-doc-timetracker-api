/**
 * third party libraries
 */
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");
const http = require("http");
const mapRoutes = require("express-routes-mapper");
const cors = require("cors");
const path = require("path");
/**
 * server configuration
 */
const config = require("../config/");
const dbService = require("./services/db.service");
const auth = require("./policies/auth.policy");

// environment: development, staging, testing, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);
const mappedOpenRoutes = mapRoutes(config.publicRoutes, "api/controllers/");
const mappedAuthRoutes = mapRoutes(config.privateRoutes, "api/controllers/");
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

// secure express app
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false
  })
);

// parsing the request bodys
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "build")));

// secure your private routes with jwt authentication middleware
app.all("/private/*", (req, res, next) => auth(req, res, next));

// fill routes for express application
app.use("/public", mappedOpenRoutes);
app.use("/private", mappedAuthRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build/index.html"));
});

console.log('Api',process.env.EMAIL_ID, process.env.EMAIL_PASSWORD,process.env.SERVER_URL);
const PaymentController = require("./controllers/PaymentController");
PaymentController().setwebhookEndpoints();

server.listen(config.port, () => {
  if (
    environment !== "production" &&
    environment !== "development" &&
    environment !== "testing"
  ) {
    console.error(
      `NODE_ENV is set to ${environment}, but only production and development are valid.`
    );
    process.exit(1);
  }
  return DB;
});

server.on("error", e => {
  console.log(e);
});

server.on("close", e => {
  console.log("Server Stopped ...");
});

process.on("SIGINT", function() {
  server.close();
});
