const { check } = require("express-validator");

const isValidAddress = () => {

        check('postcode', "min length should be 3").isLength({ min: 3 }),
        check('line1', "min length should be 3").isLength({ min: 3 }),
        check('line2', "min length should be 3").isLength({ min: 3 }).optional(),
        check('city', "min length should be 3").isLength({ min: 3 }),
        check('country', "min length should be 3").isLength({ min: 3 })
    return true
}

const createStudentValidationRules = () => {
    return [
        check("firstName", "min length should be 3").isLength({ min: 3 }),
        check("lastName", "min length should be 3").isLength({ min: 3 }),
        check('parents', "min length should be 3").isLength({ min: 3 }),
        check('dob', 'must be a valid date').isDate().trim(),
        check('education', "min length should be 3").isLength({ min: 3 }),
        check('address', "address should be a array").custom(isValidAddress),

    ]
}

const updateStudentValidationRules = () => {
    return [
        check("firstName", "min length should be 3").isLength({ min: 3 }).optional(),
        check("lastName", "min length should be 3").isLength({ min: 3 }).optional(),
        check('parents', "min length should be 3").isLength({ min: 3 }).optional(),
        check('dob', 'must be a valid date').trim().isDate().optional(),
        check('education', "min length should be 3").isLength({ min: 3 }).optional(),
        check('address', "address should be a array").custom(isValidAddress).optional(),
    ]
}

module.exports = {
    createStudentValidationRules,
    updateStudentValidationRules
}