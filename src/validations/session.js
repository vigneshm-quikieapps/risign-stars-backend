const { body } = require("express-validator");
const { ENUM_BUSINESS_TYPE } = require("../contants/constant");

const createSessionValidationRules = () => {
  return [
    body("platformId", "min length should be 2").isLength({ min: 2 }),
    body("name", "min length should be 2 and max length should be 70").isLength(
      { min: 2, max: 70 }
    ),
    body("code", "min length should be 2").isLength({ min: 2 }),
    body("tradename", "min length should be 2").isLength({ min: 2 }),
    body("type", "invalid value").isIn(ENUM_BUSINESS_TYPE),
    body(
      "about",
      "min length should be 2 and max length should be 200"
    ).isLength({ min: 2, max: 200 }),
    body("postcode", "min length should be 2").isLength({ min: 2 }),
    body("line1", "min length should be 2").isLength({ min: 2 }),
    body("line2", "min length should be 2").isLength({ min: 2 }),
    body("line3", "min length should be 2").isLength({ min: 2 }),
    body("country", "min length should be 2").isLength({ min: 2 }),
  ];
};

module.exports = {
  createSessionValidationRules,
};
