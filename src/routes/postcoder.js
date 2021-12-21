const express = require("express");

const { isAuthorized } = require("../middlewares/auth");
const { getAddressList } = require("../controllers/postcoder");

const router = express.Router();

router.post("/", isAuthorized(null, null), getAddressList);

module.exports = router;
