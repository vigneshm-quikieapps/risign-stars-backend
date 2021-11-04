const express = require("express");
const router = express.Router();

const session = require("../controllers/session");

router.put("/session/:id", session.update);

module.exports = router;
