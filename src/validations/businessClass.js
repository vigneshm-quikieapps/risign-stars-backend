const { check } = require("express-validator");

const Business = require("../models/business");
const BusinessSession = require("../models/businessSession");
const Evaluation = require("../models/evaluation");
const Category = require("../models/Category");
const {
  ENUM_REGISTRATION_FORM,
  ENUM_TERM_STATUS,
} = require("../constants/class");

const businessIdValidation = async (businessId) => {
  try {
    if (!businessId) {
      throw new Error();
    }

    let business = await Business.findById(businessId);
    if (!business) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid Business`);
  }
};

const categoryIdValidation = async (categoryId) => {
  try {
    if (!categoryId) {
      throw new Error();
    }

    let categorys = await Category.findById(categoryId);
    if (!categorys) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid category`);
  }
};

const evaluationIdValidation = async (evaluationId) => {
  try {
    if (!evaluationId) {
      throw new Error();
    }

    let evaluations = await Evaluation.findById(evaluationId);
    if (!evaluations) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid evaluation`);
  }
};

const sessionIdValidation = async (sessionIds) => {
  try {
    if (!sessionIds) {
      throw new Error();
    }

    let sessions = await BusinessSession.findById(sessionIds);
    if (!sessions) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid session`);
  }
};
const createClassValidationRules = () => {
  return [
    check("name", "name should be at least 3 char").isLength({ min: 3 }),
    check("businessId").custom(businessIdValidation),
    check("evaluationId").custom(evaluationIdValidation),
    check("categoryId").custom(categoryIdValidation),
    check("sessionIds").custom(sessionIdValidation),
    check("status", `status should  only be ${ENUM_TERM_STATUS}`)
      .optional()
      .isIn(ENUM_TERM_STATUS),
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
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 3,
    }),
    check("createdBy", "createdBy should be a valid userId").isLength({
      min: 3,
    }),
  ];
};

const updateClassValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("businessId").optional().custom(businessIdValidation),
    check("evaluationId").optional().custom(evaluationIdValidation),
    check("categoryId").optional().custom(categoryIdValidation),
    check("sessionIds").optional().custom(sessionIdValidation),
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
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 3,
    }),
  ];
};
module.exports = {
  createClassValidationRules,
  updateClassValidationRules,
  businessIdValidation,
  categoryIdValidation,
  evaluationIdValidation,
  sessionIdValidation,
};
