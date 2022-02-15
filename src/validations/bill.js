const { body } = require("express-validator");
const { isValidClassId } = require("./helpers/class");
const { isValidMemberId } = require("./helpers/member");
const { isValidBusinessId } = require("./helpers/business");
const isValidBillId = require("./helpers/bill");
const { isValidEnrolmentId } = require("./helpers/enrolment");
const { ENUM_TRANSFER_ALLOWED } = require("../constants/enrolment");
const {
  ENUM_TRANSACTION_TYPES,
  ENUM_PAYMENT_METHODS,
} = require("../constants/bill");

const billOfAMemberInAClassValidationRules = () => {
  return [
    body("memberId", "should be a valid Member").custom(isValidMemberId),
    body("classId", "should be a valid Class")
      .optional()
      .custom(isValidClassId),
    // Earlier classId was there  in body payload now enrolmentId is used
    body("enrolmentId", "should be a valid Enrolment")
      .optional()
      .custom(isValidEnrolmentId),
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
    body("reference", "should be at least 3 char").isLength({ min: 3 }),
    body(
      "transactionType",
      `should be either: ${ENUM_TRANSACTION_TYPES.join(" / ")}`
    )
      .optional()
      .isIn(ENUM_TRANSACTION_TYPES),
    body("paymentMethod", `should be min 3 char`)
      .optional()
      .isLength({ min: 3 }),
  ];
};

const deleteTransactionValidationRules = () => {
  return [body("billId").custom(isValidBillId)];
};

module.exports = {
  billOfAMemberInABusinessValidationRules,
  billOfAMemberInAClassValidationRules,
  enterTransactionValidationRules,
  deleteTransactionValidationRules,
};
