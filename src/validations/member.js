const { body } = require("express-validator");

const createMemberValidationRules = () => {
    return [
      body("firstName", "min length should be 2").isLength({ min: 2 }),
      body("lastName", "min length should be 2").isLength({ min: 2 }),
      body('dob', 'must be a valid date').isDate().trim(),
      body("contacts").isArray(),
    ];
  };
  module.exports = {
    createMemberValidationRules,
    
  };
  