const { check, param, body } = require("express-validator");
const { isValidTermId } = require("./helpers/term");
const { isValidClassId } = require("./helpers/class");
const { isValidCoachId } = require("./helpers/coach");
const { ENUM_DAYS } = require("../constants/session");

const createSessionCommonValidationRules = () => {
  return [
    check("name", "should be at least 3 char").isLength({ min: 3 }),
    check("facility", "should be at least 3 char").isLength({ min: 3 }),
    check("term", "should be an object").isObject(),
    check("term._id").custom(isValidTermId),
    check("term.startDate", "should be a date ").isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check("term.endDate", "should be a date ").isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check("pattern.day", `should be either: ${ENUM_DAYS.join(" / ")}`).isIn(
      ENUM_DAYS
    ),
    check("pattern.startTime", "should be a valid iso format").isISO8601(),
    check("pattern.endTime", "should be a valid iso format").isISO8601(),
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
    check("facility", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("pattern.day", `should be either: ${ENUM_DAYS.join(" / ")}`)
      .optional()
      .isIn(ENUM_DAYS),
    check("pattern.startTime", "should be a valid iso format")
      .optional()
      .isISO8601(),
    check("pattern.endTime", "should be a valid iso format")
      .optional()
      .isISO8601(),
    check("fullcapacity", "fullcapacity should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check("waitcapacity", "waitcapacity should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check("coachId", "coach should be a Coach Id and it should not be Empty!!")
      .optional()
      .custom(isValidCoachId),
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
