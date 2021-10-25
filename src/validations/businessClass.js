const { check } = require("express-validator");
const {
  ENUM_REGISTRATION_FORM,
  ENUM_TERM_STATUS,
  ENUM_STATUS,
  ENUM_PAY_FREQUENCY,
} = require("../constants/class");
const { isValidCategoryId } = require("./helpers/category");
const { isValidEvaluationSchemeId } = require("./helpers/evaluationScheme");
const { isValidBusinessId } = require("./helpers/business");
const { isValidTermId } = require("./helpers/term");
const { isValidCoachId } = require("./helpers/coach");
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
//     check("about", "about should be atleast 3 char")
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
      `registrationform should only be ${ENUM_REGISTRATION_FORM}`
    )
      .optional()
      .isIn(ENUM_REGISTRATION_FORM),
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check(
      "enrolmentControls",
      "enrolmentControls should be an Array and should not be empty "
    )
      .isArray()
      .notEmpty(),
    check("charges", "charges should be an Array and should not be empty")
      .isArray()
      .notEmpty(),
    check("charges.*.name", "should be atleast 3 char").isLength({ min: 3 }),
    check("charges.*.amount", "should be a number").isNumeric(),
    check("charges.*.mandatory", "should be a boolean").isBoolean(),
    check("charges.*.payFrequency", "should be atleast 3 char").isIn(
      ENUM_PAY_FREQUENCY
    ),
    check("sessions", "should be an array").isArray(),
    check("sessions.*.name", "name should be at least 3 char").isLength({
      min: 3,
    }),
    check("sessions.*.term", "term should be an object").isObject(),
    check("sessions.*.term._id").custom(isValidTermId),
    check(
      "sessions.*.term.startDate",
      "should be in the following format: YYYY-MM-DD"
    ).isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check(
      "sessions.*.term.endDate",
      "should be a in the following format: YYYY-MM-DD"
    ).isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check(
      "sessions.*.pattern.day",
      `should be an  in ${ENUM_DAYS.join(" / ")}`
    ).isIn(ENUM_DAYS),
    check(
      "sessions.*.pattern.startTime",
      "should be a valid iso format"
    ).isISO8601(),
    check(
      "sessions.*.pattern.endTime",
      "should be a valid iso format"
    ).isISO8601(),
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
    check("about", "about should be atleast 3 char")
      .optional()
      .isLength({ min: 3 }),
    check(
      "enrolmentControls",
      "enrolmentControls should be an Array and should not be empty "
    )
      .optional()
      .isArray()
      .notEmpty(),
    check("charges", "charges should be an Array and should not be empty")
      .optional()
      .isArray()
      .notEmpty(),
    check("charges.*.name", "should be atleast 3 char").isLength({ min: 3 }),
    check("charges.*.amount", "should be a number").isNumeric(),
    check("charges.*.mandatory", "should be a boolean").isBoolean(),
    check("charges.*.payFrequency", "should be atleast 3 char").isIn(
      ENUM_PAY_FREQUENCY
    ),
  ];
};
module.exports = {
  createClassValidationRules,
  updateClassValidationRules,
};
