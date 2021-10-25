const { check, param, body } = require("express-validator");
const { businessIdValidation } = require("./businessClass");
const { isValidTermId } = require("./helpers/term");
const { isValidClassId } = require("./helpers/class");
const { isValidCoachId } = require("./helpers/coach");

const createSessionCommonValidationRules = () => {
  return [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("term", "term should be an object").isObject(),
    check("term._id").custom(isValidTermId),
    check("term.startdate", "startdate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("term.enddate", "enddate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check(
      "pattern.*.day",
      "pattern day  should be an  in [mon, tue, wed, thu, fri, sat, sun]"
    ).isIn("mon", "tue", "wed", "thu", "fri", "sat", "sun"),
    check(
      "pattern.*.starttime",
      "starttime   should be a date in format: 'MM-DD-YYYY'"
    ).isDate({ format: "MM-DD-YYYY" }),
    check(
      "pattern.*.endtime",
      "endtime   should be a date in format: 'MM-DD-YYYY'"
    ).isDate({ format: "MM-DD-YYYY" }),
    check("fullcapacity", "fullcapacity should be a Number/Integer  ")
      .optional()
      .isInt(),
    check("waitcapacity", "waitcapacity should be a Number/Integer  ")
      .optional()
      .isInt(),
    check(
      "coachId",
      "coach should be a Coach Id and it should not be Empty!!"
    ).custom(isValidCoachId),
  ];
};

const createSessionValidationRules = () => {
  return [
    ...createSessionCommonValidationRules(),
    // check("name", "name should be at least 3 char").isLength({ min: 3 }),
    // check("term", "term should be an object").isObject(),
    // check("term._id").custom(isValidTermId),
    // check("term.startdate", "startdate should be a date ").optional().isDate({
    //   format: "MM-DD-YYYY",
    // }),
    // check("term.enddate", "enddate should be a date ").optional().isDate({
    //   format: "MM-DD-YYYY",
    // }),
    check("businessId").custom(businessIdValidation),
    check("classId").custom(isValidClassId),
    // check(
    //   "pattern.*.day",
    //   "pattern day  should be an  in [mon, tue, wed, thu, fri, sat, sun]"
    // ).isIn("mon", "tue", "wed", "thu", "fri", "sat", "sun"),
    // check(
    //   "pattern.*.starttime",
    //   "starttime   should be a date in format: 'MM-DD-YYYY'"
    // ).isDate({ format: "MM-DD-YYYY" }),
    // check(
    //   "pattern.*.endtime",
    //   "endtime   should be a date in format: 'MM-DD-YYYY'"
    // ).isDate({ format: "MM-DD-YYYY" }),
    // check("fullcapacity", "fullcapacity should be a Numbre/Integer  ")
    //   .optional()
    //   .isInt(),
    // check("waitcapacity", "waitcapacity should be a Numbre/Integer  ")
    //   .optional()
    //   .isInt(),
    // check(
    //   "coachId",
    //   "coach should be a Coach Id and it should not be Empty!!"
    // ).isLength({ min: 10 }),
  ];
};

const updateSessionValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("term", "term should be an object").optional().isObject(),
    check("term._id").optional().custom(isValidTermId),
    check("term.startdate", "startdate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("term.enddate", "enddate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("businessId").optional().custom(businessIdValidation),
    check("classId").optional().custom(isValidClassId),
    check(
      "pattern.*.day",
      "pattern day  should be an  in [mon, tue, wed, thu, fri, sat, sun]"
    )
      .optional()
      .isIn("mon", "tue", "wed", "thu", "fri", "sat", "sun"),
    check(
      "pattern.*.starttime",
      "starttime   should be a date in format: 'MM-DD-YYYY'"
    )
      .optional()
      .isDate({ format: "MM-DD-YYYY" }),
    check(
      "pattern.*.endtime",
      "endtime   should be a date in format: 'MM-DD-YYYY'"
    )
      .optional()
      .isDate({ format: "MM-DD-YYYY" }),
    check("fullcapacity", "fullcapacity should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check("waitcapacity", "waitcapacity should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check("coachId", "coach should be a Coach Id and it should not be Empty!!")
      .optional()
      .isLength({ min: 10 }),
  ];
};

const getSessionsInAClassOfAParticularTermValidationRules = () => {
  return [
    body("termId", "is required").bail().custom(isValidTermId),
    body("classId", "is required").bail().custom(isValidClassId),
  ];
};

const getAllSessionsInATermValidationRules = () => {
  return [param("termId", "is required").custom(isValidTermId)];
};
module.exports = {
  createSessionValidationRules,
  getAllSessionsInATermValidationRules,
  getSessionsInAClassOfAParticularTermValidationRules,
  updateSessionValidationRules,
  createSessionCommonValidationRules,
};
