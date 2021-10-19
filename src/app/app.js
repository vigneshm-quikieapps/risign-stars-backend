const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var corsOptions = {
  origin: "https://sudarshanshkrishna.github.io",
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

/**
 * registering routes
 * this should be last in importing modules
 */
require("../routes")(app);

module.exports = app;
