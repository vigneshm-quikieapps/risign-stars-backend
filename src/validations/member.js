const { body } = require("express-validator");
const { ADDRESS_TYPE, RELATIONSHIPS } = require("../contants/constant");

const createMemberValidationRules = () => {
    return [
      body("userId", "min length should be 2").isLength({ min: 2 }),
      body("membership").isArray(),
      body("membership.*.businessId", "min length should be 2").isLength({ min: 2 }),
      body("membership.*.clubMembershipId", "min length should be 2").isLength({ min: 2 }),
      body("firstName", "min length should be 2 and max length should be 70").isLength({ min: 2, max:70 }),
      body("lastName", "min length should be 2 and max length should be 70").isLength({ min: 2, max:70}),
      body('dob', 'must be a valid date').isDate().trim(),
      body("contacts").isArray(),
      body("contacts.*.addressType", "invalid type").isIn(ADDRESS_TYPE),
      body("contacts.*.firstName", "min length should be 2 and max length should be 70").isLength({ min: 2, max:70 }),
      body("contacts.*.lastName", "min length should be 2 and max length should be 70").isLength({ min: 2, max:70 }),
      body("contacts.*.contact", "min length should be 2").isLength({ min: 2 }),
      body("contacts.*.relationShip", "invalid relationship").isIn(RELATIONSHIPS),
      
     
    ];
  };
  module.exports = {
    createMemberValidationRules,
    
    
  };
  