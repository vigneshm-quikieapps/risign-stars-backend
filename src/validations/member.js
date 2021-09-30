const { body } = require("express-validator");
const { ADDRESS_TYPE, RELATIONSHIPS } = require("../contants/constant");
const { businessIdValidation } = require("./businessClass");
const { userIdValidation } = require("./businessFinance");

const createMemberValidationRules = () => {
  return [
    body("userId", "min length should be 2").custom(userIdValidation),
    body("membership").isArray(),
    body("membership.*.businessId", "min length should be 2").custom(
      businessIdValidation
    ),
    body("membership.*.clubMembershipId", "min length should be 2").isLength({
      min: 2,
    }),
    body(
      "firstName",
      "min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body(
      "lastName",
      "min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body("dob", "must be a valid date").isDate(),
    body("contacts").isArray(),
    body("contacts.*.addressType", "invalid type").isIn(ADDRESS_TYPE),
    body(
      "contacts.*.firstName",
      "min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body(
      "contacts.*.lastName",
      "min length should be 2 and max length should be 70"
    ).isLength({ min: 2, max: 70 }),
    body("contacts.*.contact", "min length should be 2").isLength({ min: 2 }),
    body("contacts.*.relationShip", "invalid relationship").isIn(RELATIONSHIPS),
    body("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .custom(userIdValidation),
    body("createdBy", "createdBy should be a valid userId").custom(
      userIdValidation
    ),
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
      .custom(businessIdValidation),
    body("membership.*.clubMembershipId", "min length should be 2")
      .optional()
      .isLength({ min: 2 }),
    body("firstName", "min length should be 2 and max length should be 70")
      .optional()
      .isLength({ min: 2, max: 70 }),
    body("lastName", "min length should be 2 and max length should be 70")
      .optional()
      .isLength({ min: 2, max: 70 }),
    body("dob", "must be a valid date").optional().isDate(),
    body("contacts").optional().isArray(),
    body("contacts.*.addressType", "invalid type")
      .optional()
      .isIn(ADDRESS_TYPE),
    body(
      "contacts.*.firstName",
      "min length should be 2 and max length should be 70"
    )
      .optional()
      .isLength({ min: 2, max: 70 }),
    body(
      "contacts.*.lastName",
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
    body("updatedBy", "updatedBy should be a valid userId").custom(
      userIdValidation
    ),
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
    body("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .custom(userIdValidation),
    body("createdBy", "createdBy should be a valid userId").custom(
      userIdValidation
    ),
  ];
};
module.exports = {
  createMemberValidationRules,
  updateMemberValidationRules,
  createEmergencyContactValidationRules,
};
