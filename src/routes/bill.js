const express = require("express");
const router = express.Router();
const {
  getAll,
  billsOfAMemberInAClass,
  billsOfAMemberInABusiness,
  enterTransaction,
} = require("../controllers/bill");
const validate = require("../validations/validate");
const {
  billOfAMemberInAClassValidationRules,
  billOfAMemberInABusinessValidationRules,
  enterTransactionValidationRules,
} = require("../validations/bill");
const { isAuthorized } = require("../middlewares/auth");
const getResourceBusinessIdForBill = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdForBill");
const { CREATE } = require("../constants/rest");
const { CLASS_DEFINITION } = require("../constants/pages");

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

router.post(
  "/enter-transaction",
  isAuthorized(CLASS_DEFINITION, CREATE, {
    getResourceBusinessId: getResourceBusinessIdForBill,
  }),
  enterTransactionValidationRules(),
  validate,
  enterTransaction
);

module.exports = router;
