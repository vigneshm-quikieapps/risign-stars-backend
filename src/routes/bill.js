const express = require("express");
const router = express.Router();
const { getAll } = require("../controllers/bill");

// read routes
router.get("/", getAll);

module.exports = router;
