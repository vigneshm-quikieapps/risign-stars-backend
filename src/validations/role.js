const { body } = require("express-validator");
const { FUNCTIONAL_PRIVILEGES } = require("../constants/constant");
const Role = require("../models/Role");

const isUniqueCode = async (code) => {
  let roleCount = await Role.count({ code });
  if (roleCount) {
    return Promise.reject("code already exists");
  }
  return true;
};

const isUniqueName = async (name) => {
  let roleCount = await Role.count({ name });
  if (roleCount) {
    return Promise.reject("name already exists");
  }
  return true;
};

const createRoleValidationRules = () => {
  return [
    body("name", "Name should have at least 3 characters")
      .isLength({
        min: 3,
      })
      .bail()
      .custom(isUniqueName),
    body("code", "code should have at least 3 characters")
      .isLength({
        min: 3,
      })
      .bail()
      .custom(isUniqueCode),
    body("description", "description should at least 5 characters")
      .optional()
      .isLength({ min: 5 }),
    body("functionalPrivileges", "should be an array").isArray(),
    body(
      "functionalPrivileges.*.type",
      `page name should be either: ${FUNCTIONAL_PRIVILEGES.join("/")}`
    ).isIn(FUNCTIONAL_PRIVILEGES),
    body(
      "functionalPrivileges.*.permission.create",
      "permission.create must be boolean"
    ).isBoolean(),
    body(
      "functionalPrivileges.*.permission.read",
      "permission.read must be boolean"
    ).isBoolean(),
    body(
      "functionalPrivileges.*.permission.update",
      "permission.update must be boolean"
    ).isBoolean(),
    body(
      "functionalPrivileges.*.permission.delete",
      "permission.delete must be boolean"
    ).isBoolean(),
  ];
};

const updateRoleValidationRules = () => {
  return [
    body("name", "Name should have at least 3 characters")
      .optional()
      .isLength({ min: 3 }),
    body("code", "code should have at least 3 characters")
      .isLength({
        min: 3,
      })
      .optional()
      .bail()
      .custom(isUniqueCode),
    body("description", "description should at least 5 characters")
      .optional()
      .isLength({ min: 5 }),
    body("functionalPrivileges", "should be an array").optional().isArray(),
    body(
      "functionalPrivileges.*.type",
      `page name should be either: ${FUNCTIONAL_PRIVILEGES.join("/")}`
    )
      .optional()
      .isIn(FUNCTIONAL_PRIVILEGES),
    body(
      "functionalPrivileges.*.permission.create",
      "permission.create must be boolean"
    )
      .optional()
      .isBoolean(),
    body(
      "functionalPrivileges.*.permission.read",
      "permission.read must be boolean"
    )
      .optional()
      .isBoolean(),
    body(
      "functionalPrivileges.*.permission.update",
      "permission.update must be boolean"
    )
      .optional()
      .isBoolean(),
    body(
      "functionalPrivileges.*.permission.delete",
      "permission.delete must be boolean"
    )
      .optional()
      .isBoolean(),
  ];
};

module.exports = {
  createRoleValidationRules,
  updateRoleValidationRules,
};
