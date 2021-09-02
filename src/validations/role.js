const { body } = require("express-validator");

const createRoleValidationRules = () => {
  return [
    body("name", "Name should have atleast 3 characters").isLength({ min: 5 }),
    body("description").optional().isLength({ min: 5 }),
    body("functionalPriviledges").isArray(),
    body("dataPriviledges").isArray(),
  ];
};

const updateRoleValidationRules = () => {
  return [
    body("name", "Name should have atleast 3 characters")
      .optional()
      .isLength({ min: 5 }),
    body("description").optional().isLength({ min: 5 }),
    body("functionalPriviledges").optional().isArray(),
  ];
};

module.exports = {
  createRoleValidationRules,
  updateRoleValidationRules,
};
