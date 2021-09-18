const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

/**
 * registering routes
 * this should be last in importing modules
 */
require("../routes")(app);

module.exports = app;
