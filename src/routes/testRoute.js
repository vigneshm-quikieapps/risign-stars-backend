const express = require("express");
const { Counter } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  let counter = await Counter.genClubMemberShipId();
  return res.send({ counter });
});

module.exports = router;
