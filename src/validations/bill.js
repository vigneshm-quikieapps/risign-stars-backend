const { body } = require("express-validator");
const { isValidClassId } = require("./helpers/class");
const { isValidMemberId } = require("./helpers/member");
const { isValidBusinessId } = require("./helpers/business");
const isValidBillId = require("./helpers/bill");
const { ENUM_TRANSFER_ALLOWED } = require("../constants/enrolment");
const { ENUM_TRANSACTION_TYPES } = require("../constants/bill");

const billOfAMemberInAClassValidationRules = () => {
  return [
    body("memberId", "should be a valid Member").custom(isValidMemberId),
    body("classId", "should be a valid Class").custom(isValidClassId),
  ];
};

const billOfAMemberInABusinessValidationRules = () => {
  return [
    body("memberId", "should be a valid member ID").custom(isValidMemberId),
    body("businessId", "should be a valid business ID").custom(
      isValidBusinessId
    ),
  ];
};

const enterTransactionValidationRules = () => {
  return [
    body("billId").custom(isValidBillId),
    body("reference", "should be atleast 3 char").isLength({ min: 3 }),
    body(
      "transactionType",
      `should be either: ${ENUM_TRANSACTION_TYPES.join(" / ")}`
    )
      .optional()
      .isIn(ENUM_TRANSACTION_TYPES),
  ];
};

module.exports = {
  billOfAMemberInABusinessValidationRules,
  billOfAMemberInAClassValidationRules,
  enterTransactionValidationRules,
};
