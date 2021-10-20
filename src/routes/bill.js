const express = require("express");
const router = express.Router();
const { getAll, billsOfAMemberInAClass } = require("../controllers/bill");
const validate = require("../validations/validate");
const { billOfAMemberInAClassValidationRules } = require("../validations/bill");

// read routes
router.get("/", getAll);

router.post(
  "/of-member-in-a-class",
  billOfAMemberInAClassValidationRules(),
  validate,
  billsOfAMemberInAClass
);

module.exports = router;
