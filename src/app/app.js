const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var corsOptions = {
  credentials: process.env.NODE_ENV === "production",
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ORIGINS.split(" ")
      : "*",
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
