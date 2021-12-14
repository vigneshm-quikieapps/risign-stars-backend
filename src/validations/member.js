const { body } = require("express-validator");
const { ADDRESS_TYPE, RELATIONSHIPS } = require("../constants/member");
const { ENUM_GENDER } = require("../constants/user");
const { isValidBusinessId } = require("./helpers/business");
const { userIdValidation } = require("./businessFinance");

const createMemberValidationRules = () => {
  return [
    body("userId", "min length should be 2").custom(userIdValidation),
    body("name", "min length should be 2 and max length should be 70").isLength(
      { min: 2, max: 70 }
    ),
    body("dob", "must be a valid date").isDate(),
    body("gender", `should be either ${ENUM_GENDER.join(" / ")}`).isIn(
      ENUM_GENDER
    ),
    body("contacts", "should be an array")
      .isArray()
      .bail()
      .isLength(2)
      .withMessage("should be of length 2"),
    body(
      "contacts.*.addressType",
      `should be either ${ADDRESS_TYPE.join(" / ")}`
    ).isIn(ADDRESS_TYPE),
    body(
      "contacts.*.name",
      "min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body("contacts.*.contact", "min length should be 2").isLength({ min: 2 }),
    body(
      "contacts.*.relationship",
      `should be either ${RELATIONSHIPS.join(" / ")}`
    ).isIn(RELATIONSHIPS),
  ];
};

const updateMemberValidationRules = () => {
  return [
    body("userId", "min length should be 2")
      .optional()
      .custom(userIdValidation),
    body("membership").optional().isArray(),
    body("membership.*.business", "min length should be 2")
      .optional()
      .custom(isValidBusinessId),
    body("membership.*.clubMembershipId", "min length should be 2")
      .optional()
      .isLength({ min: 2 }),
    body("name", "min length should be 2 and max length should be 70")
      .optional()
      .isLength({ min: 2, max: 70 }),
    body("dob", "must be a valid date").optional().isDate(),
    body("gender", "GENDER SHOULD BE IN [MALE, FEMALE, OTHER]")
      .optional()
      .isIn(["MALE", "FEMALE", "OTHER"]),
    body("contacts").optional().isArray(),
    body("contacts.*.addressType", "invalid type")
      .optional()
      .isIn(ADDRESS_TYPE),
    body(
      "contacts.*.name",
      "min length should be 2 and max length should be 70"
    )
      .optional()
      .isLength({ min: 2, max: 70 }),
    body("contacts.*.contact", "min length should be 2")
      .optional()
      .isLength({ min: 2 }),
    body("contacts.*.relationShip", "invalid relationship")
      .optional()
      .custom(userIdValidation)
      .isIn(RELATIONSHIPS),
  ];
};
const createEmergencyContactValidationRules = () => {
  return [
    body("contacts", "contacts should be an array").isArray(),
    body("contacts.*.addressType", "Address type invalid type").isIn(
      ADDRESS_TYPE
    ),
    body(
      "contacts.*.firstName",
      "min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body(
      "contacts.*.lastName",
      "firstName:min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body("contacts.*.contact", "min length should be 2").isLength({ min: 2 }),
    body("contacts.*.relationShip", "invalid relationship").isIn(RELATIONSHIPS),
  ];
};
const updateEmergencyContactValidationRules = () => {
  return [
    body("contacts", "contacts should be an array").optional().isArray(),
    body("contacts.*.addressType", "Address type invalid type")
      .optional()
      .isIn(ADDRESS_TYPE),
    body(
      "contacts.*.name",
      "min length should be 2 and max length should be 70"
    )
      .optional()
      .isLength({ min: 2, max: 70 }),
    body("contacts.*.contact", "min length should be 2")
      .optional()
      .isLength({ min: 2 }),
    body("contacts.*.relationShip", "invalid relationship")
      .optional()
      .isIn(RELATIONSHIPS),
  ];
};
module.exports = {
  createMemberValidationRules,
  updateMemberValidationRules,
  createEmergencyContactValidationRules,
  updateEmergencyContactValidationRules,
};
