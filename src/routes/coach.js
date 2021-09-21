const express = require("express");
const { createCoach } = require("../controllers/coach");
const router = express.Router();

router.post("/coach/create", createCoach);

module.exports = router;
