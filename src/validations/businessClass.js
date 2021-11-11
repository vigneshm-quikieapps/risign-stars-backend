const { check } = require("express-validator");
const {
  ENUM_REGISTRATION_FORM,
  ENUM_TERM_STATUS,
  ENUM_STATUS,
  ENUM_PAY_FREQUENCY,
  ENUM_ENROLMENT_CONTROLS,
} = require("../constants/class");
const { isValidCategoryId } = require("./helpers/category");
const { isValidEvaluationSchemeId } = require("./helpers/evaluationScheme");
const { isValidBusinessId } = require("./helpers/business");
const { isValidTermId } = require("./helpers/term");
const { isValidCoachId } = require("./helpers/coach");
const { isValidClassId } = require("./helpers/class");
const { ENUM_DAYS } = require("../constants/session");

/**
 * do not delete: for backup
 * @returns
 */
// const createClassValidationRules = () => {
//   return [
//     check("name", "name should be at least 3 char").isLength({ min: 3 }),
//     check("businessId").custom(isValidBusinessId),
//     check("evaluationSchemeId").custom(isValidEvaluationSchemeId),
//     check("categoryId").custom(isValidCategoryId),
//     check("sessionIds").custom(isValidSessionId),
//     check("status", `status should  only be ${ENUM_STATUS}`)
//       .optional()
//       .isIn(ENUM_STATUS),
//     check(
//       "registrationform",
//       `registrationform should only be ${ENUM_REGISTRATION_FORM}`
//     )
//       .optional()
//       .isIn(ENUM_REGISTRATION_FORM),
//     check("about", "about should be at least 3 char")
//       .optional()
//       .isLength({ min: 3 }),
//     check(
//       "enrolmentControls",
//       "enrolmentControls should be an Array and should not be empty "
//     )
//       .isArray()
//       .notEmpty(),
//     check("charges", "charges should be an Array and should not be empty")
//       .isArray()
//       .notEmpty(),
//   ];
// };

// const is24Hours = async (timeString) => {
//   try {
//     let [hour, min] = timeString.split(":");
//     console.log({ timeString });
//     console.log({ hour });
//     console.log({ min });
//     if (
//       !hour ||
//       !min ||
//       !Number.isInteger(hour) ||
//       !Number.isInteger(min) ||
//       hour < 0 ||
//       hour > 23 ||
//       min < 0 ||
//       min > 59
//     ) {
//       throw new Error("should be HH:MM, 24 hour format, e.g: 14:30");
//     }
//     return true;
//   } catch (err) {
//     return Promise.reject(err.message);
//   }
// };

const createClassValidationRules = () => {
  return [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("businessId").custom(isValidBusinessId),
    check("evaluationSchemeId").custom(isValidEvaluationSchemeId),
    check("categoryId").custom(isValidCategoryId),
    check("status", `status should either be ${ENUM_STATUS.join(" / ")}`)
      .optional()
      .isIn(ENUM_STATUS),
    check(
      "registrationform",
      `registrationform should only be ${ENUM_REGISTRATION_FORM.join(" / ")}`
    )
      .optional()
      .isIn(ENUM_REGISTRATION_FORM),
    check("about", "about should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check(
      "enrolmentControls",
      "enrolmentControls should be an Array and should not be empty "
    )
      .isArray()
      .bail()
      .notEmpty(),
    check(
      "enrolmentControls.*.name",
      `should be either: ${ENUM_ENROLMENT_CONTROLS.join(" / ")}`
    ).isIn(ENUM_ENROLMENT_CONTROLS),
    check("enrolmentControls.*.values", "should be an array")
      .isArray()
      .bail()
      .notEmpty(),
    check("charges", "charges should be an Array and should not be empty")
      .isArray()
      .notEmpty(),
    check("charges.*.name", "should be at least 3 char").isLength({ min: 3 }),
    check("charges.*.amount", "should be a number").isNumeric(),
    check("charges.*.mandatory", "should be a boolean").isBoolean(),
    check(
      "charges.*.payFrequency",
      `should be either: ${ENUM_PAY_FREQUENCY.join(" / ")}`
    ).isIn(ENUM_PAY_FREQUENCY),
    check("sessions", "should be an array").isArray(),
    check("sessions.*.name", "name should be at least 3 char").isLength({
      min: 3,
    }),
    check("sessions.*.facility", "name should be at least 3 char").isLength({
      min: 3,
    }),
    check("sessions.*.term", "term should be an object").isObject(),
    check("sessions.*.term._id").custom(isValidTermId),
    check("sessions.*.term.label", "should be at least 3 char").isLength({
      min: 3,
    }),
    check(
      "sessions.*.term.startDate",
      "should be a valid iso format"
    ).isISO8601(),
    check(
      "sessions.*.term.endDate",
      "should be a valid iso format"
    ).isISO8601(),
    check("sessions.*.pattern", `should be an array`)
      .isArray()
      .bail()
      .notEmpty()
      .withMessage(`should be an array of: ${ENUM_DAYS.join(" / ")}`),
    check("sessions.*.pattern.*", `should be: ${ENUM_DAYS.join(" / ")}`).isIn(
      ENUM_DAYS
    ),
    check("sessions.*.startTime", "should be a valid iso format").isISO8601(),
    // check("sessions.*.pattern.startTime", "should be HH:MM").custom(is24Hours),
    check("sessions.*.endTime", "should be a valid iso format").isISO8601(),
    // check("sessions.*.pattern.endTime", "should be HH:MM").custom(is24Hours),
    check(
      "sessions.*.fullcapacity",
      "fullcapacity should be a Number/Integer  "
    ).isInt(),
    check(
      "sessions.*.waitcapacity",
      "waitcapacity should be a Number/Integer  "
    ).isInt(),
    check(
      "sessions.*.coachId",
      "coach should be a Coach Id and it should not be Empty!!"
    ).custom(isValidCoachId),
  ];
};

const updateClassValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("evaluationSchemeId").optional().custom(isValidEvaluationSchemeId),
    check("categoryId").optional().custom(isValidCategoryId),
    check("status", `status should  only be ${ENUM_TERM_STATUS.join(" / ")}`)
      .optional()
      .isIn(ENUM_TERM_STATUS),
    check(
      "registrationform",
      `registrationform should only be ${ENUM_REGISTRATION_FORM.join(" / ")}`
    )
      .optional()
      .isIn(ENUM_REGISTRATION_FORM),
    check("about", "about should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check(
      "enrolmentControls",
      "enrolmentControls should be an Array and should not be empty "
    )
      .optional()
      .isArray()
      .bail()
      .notEmpty(),
    check(
      "enrolmentControls.*.name",
      `should be either: ${ENUM_ENROLMENT_CONTROLS.join(" / ")}`
    ).isIn(ENUM_ENROLMENT_CONTROLS),
    check("enrolmentControls.*.values", "should be an array")
      .isArray()
      .bail()
      .notEmpty(),
    check("charges", "charges should be an Array and should not be empty")
      .optional()
      .isArray()
      .notEmpty(),
    check("charges.*.name", "should be at least 3 char").isLength({ min: 3 }),
    check("charges.*.amount", "should be a number").isNumeric(),
    check("charges.*.mandatory", "should be a boolean").isBoolean(),
    check(
      "charges.*.payFrequency",
      `should be either: ${ENUM_PAY_FREQUENCY.join(" / ")}`
    ).isIn(ENUM_PAY_FREQUENCY),
  ];
};

const getAllTermsInAClassValidationRules = () => {
  return [check("classId").custom(isValidClassId)];
};

module.exports = {
  createClassValidationRules,
  updateClassValidationRules,
  getAllTermsInAClassValidationRules,
};
