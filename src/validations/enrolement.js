const { body } = require("express-validator");

const createEnrolementValidationRules = () => {
    return [
      body("sessionId", "min length should be 2").isLength({ min: 2 }),
      body("classId", "min length should be 2").isLength({ min: 2 }),
      body("businessId", "min length should be 2").isLength({ min: 2 }),
      body("name", "min length should be 2").isLength({ min: 2 }),
      body("clubMembershipId", "min length should be 2").isLength({ min: 2 }),
      body('startDate', 'must be a valid date').isDate().trim(),
      body('registeredDate', 'must be a valid date').isDate().trim(),
      body('droppedDate', 'must be a valid date').isDate().trim(),
      body("consent").isObject(),
      body("newsletter").isObject(),
    ];
  };

  module.exports = {
    createEnrolementValidationRules,

    
  };
  