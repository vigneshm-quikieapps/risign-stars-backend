const { body } = require("express-validator");
const { isValidClassId } = require("./helpers/classes");
const { isValidMemberId } = require("./helpers/members");

const billOfAMemberInAClassValidationRules = () => {
  return [
    body("memberId", "should be a valid Member").custom(isValidMemberId),
    body("classId", "should be a valid Class").custom(isValidClassId),
  ];
};

module.exports = {
  billOfAMemberInAClassValidationRules,
};
