const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var whitelist = [
  "http://localhost:3000",
  "https://localhost:3000",
  "https://sudarshanshkrishna.github.io",
];

var corsOptions = {
  // credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors());

/**
 * registering routes
 * this should be last in importing modules
 */
require("../routes")(app);

module.exports = app;
