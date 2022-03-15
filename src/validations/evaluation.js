const { check } = require("express-validator");
const { EVALUATION_STATUS } = require("../constants/evaluation");

const checkSkills = ({ skills }) => {
  /** skills should be an array */
  if (!Array.isArray(skills)) {
    return false;
  }
  /** skills array should contain only strings */
  if (skills.some((item) => typeof item !== "string") || skills.length < 1) {
    return false;
  }
  return true;
};

const levelsValidator = (levels, { req }) => {
  /** levels should be an array */
  if (!Array.isArray(levels)) {
    return false;
  }

  let { levelCount } = req.body;

  /** numbers of levels should be equal to the number of levelCount */
  if (levels.length !== parseInt(levelCount)) {
    return Promise.reject("Number of levels should be equal to levelCount.");
  }

  /** levels must be an array of skills */
  if (!levels.every(checkSkills)) {
    return Promise.reject("Skills must be an array of strings.");
  }

  return true;
};

const createEvaluationValidationRules = () => {
  return [
    check("name", "name should be at least 3 char unique").isLength({ min: 3 }),
    check("status", `status should be ${EVALUATION_STATUS.join(" / ")}`)
      .optional()
      .isIn(EVALUATION_STATUS),
    check("levelCount", "levelCount should be an Integer").isInt(),
    check("levels", "levels should be a array").custom(levelsValidator),
    // check("updatedBy", "updatedBy should be a valid userId")
    //   .optional()
    //   .isLength({ min: 12 }),
    // check("createdBy", "createdBy should be a valid userId").isLength({
    //   min: 12,
    // }),
  ];
};

const updateEvaluationValidationRules = () => {
  return [
    check("name", "name should be at least 3 char unique")
      .optional()
      .isLength({ min: 3 }),
    check("status", `status should be ${EVALUATION_STATUS.join(" / ")}`)
      .optional()
      .isIn(EVALUATION_STATUS),
    check("levelCount", "levelCount should be an Integer").optional().isInt(),
    check("levels").optional().isLength({ min: 1 }).custom(levelsValidator),
    // check("updatedBy", "updatedBy should be a valid userId").isLength({
    //   min: 12,
    // }),
  ];
};

module.exports = {
  createEvaluationValidationRules,
  updateEvaluationValidationRules,
};
