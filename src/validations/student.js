const { check } = require("express-validator");

const isValidDate = (value) => {
    if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;

    const date = new Date(value);
    if (!date.getTime()) return false;
    return date.toISOString().slice(0, 10) === value;
}

const createStudentValidationRules = () => {
    return [
        check("firstName", "min length should be 3").isLength({ min: 3 }),
        check("lastName", "min length should be 3").isLength({ min: 3 }),
        check('parents', "min length should be 3").isLength({ min: 3 }),
        check('dob', 'must be a valid date').isDate().trim(),
        check('education', "min length should be 3").isLength({ min: 3 }),
        check('postcode', "min length should be 3").isLength({ min: 3 }),
        check('line1', "min length should be 3").isLength({ min: 3 }),
        check('line2', "min length should be 3").isLength({ min: 3 }).optional(),
        check('city', "min length should be 3").isLength({ min: 3 }),
        check('country', "min length should be 3").isLength({ min: 3 }),
    ]
}

const updateStudentValidationRules = () => {
    return [
        check("firstName", "min length should be 3").isLength({ min: 3 }).optional(),
        check("lastName", "min length should be 3").isLength({ min: 3 }).optional(),
        check('parents', "min length should be 3").isLength({ min: 3 }).optional(),
        check('dob', 'must be a valid date').trim().isDate().optional({ checkFalsy: true }),
        check('education', "min length should be 3").isLength({ min: 3 }).optional(),
        check('postcode', "min length should be 3").isLength({ min: 3 }).optional(),
        check('line1', "min length should be 3").isLength({ min: 3 }).optional(),
        check('line2', "min length should be 3").isLength({ min: 3 }).optional(),
        check('city', "min length should be 3").isLength({ min: 3 }).optional(),
        check('country', "min length should be 3").isLength({ min: 3 }).optional(),
    ]
}

module.exports = {
    createStudentValidationRules,
    updateStudentValidationRules
}