const { body } = require("express-validator");

const createEnrolementValidationRules = () => {
    return [
      body("name", "min length should be 2").isLength({ min: 2 }),
      body('startDate', 'must be a valid date').isDate().trim(),
      body('registeredDate', 'must be a valid date').isDate().trim(),
      body('droppedDate', 'must be a valid date').isDate().trim(),
      body("consent").isArray(),
      body("newsletter").isArray(),
    ];
  };
  module.exports = {
    createEnrolementValidationRules,
    
  };
  