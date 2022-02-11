const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

var corsOptions = {
  credentials: true,
  origin: process.env.NODE_ENV ? process.env.ORIGINS.split(" ") : "*",
};
console.log("[App] cors options: ", corsOptions);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

/**
 * registering routes
 * this should be last in importing modules
 */
require("../routes")(app);
// express error handlers
app.use(function errorHandler(err, req, res, next) {
  console.log("error", err);
  res.status(500).send({
    error:
      process.env.NODE_ENV === "production" ? "Something went wrong !" : err,
  });
});
module.exports = app;
