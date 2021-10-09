const express = require("express");
const { partialCharge } = require("../helpers/bill");
const { Counter, BusinessClass, BusinessSession } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
  let businessClass = BusinessClass.findById("");
  let businessSession = BusinessSession.findById("");
  let { charges } = businessClass;
  let monthlyCharge = charges.find(
    (charge) => charge.payFrequency === "MONTHLY"
  );
  return partialCharge(businessSession.startDate, monthlyCharge);
});

module.exports = router;
