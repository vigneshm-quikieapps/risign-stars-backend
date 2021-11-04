const express = require("express");
const router = express.Router();

const registration = require("../controllers/registration");

/**
 * DEPRECATED
 */
router.post("/registration/:id", registration.update);

module.exports = router;
