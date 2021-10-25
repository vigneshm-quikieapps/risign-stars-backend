const { body } = require("express-validator");
const { isValidClassId } = require("./helpers/class");
const { isValidMemberId } = require("./helpers/member");
const { isValidBusinessId } = require("./helpers/business");

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

module.exports = {
  billOfAMemberInABusinessValidationRules,
  billOfAMemberInAClassValidationRules,
};
