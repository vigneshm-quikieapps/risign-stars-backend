const { body } = require("express-validator");
const { ENUM_PAY_FREQUENCY, ENUM_CLASSES_STATUS } = require("../contants/constant");


const createClassValidationRules = () => {
    return [

      body("platformId", "min length should be 2").isLength({ min: 2 }),
      body("name", "min length should be 2 and max length should be 70").isLength({ min: 2,max:70 }),
      body("businessId", "min length should be 2").isLength({ min: 2 }),
      body("status", "invalid value").isIn(ENUM_CLASSES_STATUS),
      body("registrationForm", "min length should be 2").isLength({ min: 2 }),
      body("evaluationScheme", "min length should be 2").isLength({ min: 2 }),
      body("businessId", "min length should be 2").isLength({ min: 2 }),
      body("about", "min length should be 2 and max length should be 200").isLength({ min: 2, max:200 }),
      //enrolementControls is missing
      body("classes").isArray(),
      body("charges").isArray(),
      body("charges.*.name", "min length should be 2").isLength({ min: 2 }),
      body("charges.*.amount", "min length should be 2").isLength({ min: 2 }),
      body("charges.*.mandatory","value must be boolean").isBoolean(),
      body("charges.*.payFrequency","invalid value").isIn(ENUM_PAY_FREQUENCY)

   
    ];
  };
  module.exports = {
    createClassValidationRules,
    
  };
  