const express = require("express");
const router = express.Router();
const {
  getAll,
  billsOfAMemberInAClass,
  billsOfAMemberInABusiness,
} = require("../controllers/bill");
const validate = require("../validations/validate");
const {
  billOfAMemberInAClassValidationRules,
  billOfAMemberInABusinessValidationRules,
} = require("../validations/bill");

// read routes
router.get("/", getAll);

router.post(
  "/of-a-member-in-a-class",
  billOfAMemberInAClassValidationRules(),
  validate,
  billsOfAMemberInAClass
);

router.post(
  "/of-a-member-in-a-business",
  billOfAMemberInABusinessValidationRules(),
  validate,
  billsOfAMemberInABusiness
);

module.exports = router;
