const { body } = require("express-validator");

const createClassValidationRules = () => {
    return [
      body("firstName", "min length should be 2").isLength({ min: 2 })
   
    ];
  };
  module.exports = {
    createClassValidationRules,
    
  };
  