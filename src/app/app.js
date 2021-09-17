const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const path = require("path");
require("../routes")(app); /** registering routes */

app.use(express.json());
app.use(cors());

module.exports = app;
