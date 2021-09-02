const { body } = require('express-validator');
const isEmailAvailable = require('../helpers/user/isEmailAvailable');

const createUserValidationRules = () => {
    return [
        body('email', "should be a valid Email").isEmail().custom(isEmailAvailable),
        body('firstName', "min length should be 2").isLength({min:2}),
        body('lastName', "min length should be 2").isLength({min:2}),
        body('roles').isArray(),
    ]
}

const updateUserValidationRules = () => {
    return [
        body('email', "should be a valid Email").optional().isEmail().custom(isEmailAvailable),
        body('firstName', "min length should be 2").optional().isLength({min:2}),
        body('lastName', "min length should be 2").optional().isLength({min:2}),
        body('roles').optional().isArray(),
    ]
}

module.exports = {
  createUserValidationRules,
  updateUserValidationRules
}