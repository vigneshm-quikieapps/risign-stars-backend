const { body } = require("express-validator");
const {
  ENUM_ENROLLED_STATUS,
  ENUM_DISCONTINUATION_REASON,
} = require("../constants/constant");

const createRegistrationValidationRules = () => {
  return [
    body("pattern").isObject(),
    body("pattern.*.day", "min length should be 2").isLength({ min: 2 }),
    body("pattern.*.startTime", "must be a valid date").isDate().trim(),
    body("pattern.*.endTime", "must be a valid date").isDate().trim(),
    body("classCapacity", "min length should be 2")
      .isNumeric()
      .isLength({ min: 2 }),
    body("waitlistCapacity", "min length should be 2")
      .isNumeric()
      .isLength({ min: 2 }),
    body("waitlistEnrolled", "min length should be 2")
      .isNumeric()
      .isLength({ min: 2 }),
    body("facility", "min length should be 2").isLength({ min: 2 }),
    body("coach").isObject(),
    body("coach.*.id", "min length should be 2").isLength({ min: 2 }),
    body("coach.*.name", "min length should be 2").isLength({ min: 2 }),
    body("members").isObject(),
    body("members.*.name", "min length should be 2").isLength({ min: 2 }),
    body("members.*.allergies", "min length should be 2").isLength({
      min: 2,
    }),
    body("members.*.conditions", "min length should be 2").isLength({
      min: 2,
    }),
    body("members.*.startDate", "must be a valid date").isDate().trim(),
    body("members.*.registeredDate", "must be a valid date").isDate().trim(),
    body("members.*.enrolledStatus", "invalid value").isIn(
      ENUM_ENROLLED_STATUS
    ),
    body("members.*.discontinuationReason", "invalid value").isIn(
      ENUM_DISCONTINUATION_REASON
    ),
    body("members.*.droppedDate", "must be a valid date").isDate().trim(),
    body("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    body("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};

module.exports = {
  createRegistrationValidationRules,
};
