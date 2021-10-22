const BusinessClass = require("../models/businessClass");
const Term = require("../models/Term");
const { check, param, body } = require("express-validator");
const { businessIdValidation } = require("./businessClass");
const { isValidTermId } = require("./helpers/term");
const { isValidClassId } = require("./helpers/classes");

const termIdValidation = async (term) => {
  try {
    if (!term) {
      throw new Error();
    }

    let terms = await Term.findById(term);
    if (!terms) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid term`);
  }
};

const classIdValidation = async (classId) => {
  try {
    if (!classId) {
      throw new Error();
    }

    let cls = await BusinessClass.findById(classId);
    if (!cls) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid Class`);
  }
};

const createSessionValidationRules = () => {
  return [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("term", "term should be an object").isObject(),
    check("term.id").custom(termIdValidation),
    check("term.startdate", "startdate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("term.enddate", "enddate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("businessId").custom(businessIdValidation),
    check("classId").custom(classIdValidation),
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
    check("fullcapacity", "fullcapacity should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check("waitcapacity", "waitcapacity should be a Numbre/Integer  ")
      .optional()
      .isInt(),
    check(
      "coachId",
      "coach should be a Coach Id and it should not be Empty!!"
    ).isLength({ min: 10 }),
    check("updatedBy", "updatedBy should be a valid userId")
      .optional()
      .isLength({ min: 12 }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};
const updateSessionValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("term", "term should be an object").optional().isObject(),
    check("term.id").optional().custom(termIdValidation),
    check("term.startdate", "startdate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("term.enddate", "enddate should be a date ").optional().isDate({
      format: "MM-DD-YYYY",
    }),
    check("businessId").optional().custom(businessIdValidation),
    check("classId").optional().custom(classIdValidation),
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
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
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
  classIdValidation,
  termIdValidation,
};
