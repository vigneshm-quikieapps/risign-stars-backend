const { check, body } = require("express-validator");
const { EVALUATION_STATUS } = require("../constants/evaluation");
const { SKILL_PROGRESS_STATUS } = require("../constants/progress");
const {
  isValidClubMembershipId,
  isValidMemberId,
  isValidBusinessId,
  isValidEvaluationSchemeId,
} = require("./helpers");
const { isValidProgressId } = require("./helpers/progress");

const checkSkills = ({ skills }) => {
  /** skills should be an array */
  if (!Array.isArray(skills)) {
    return false;
  }
  /** skills array should contain only strings */
  // if(skills.some(item => typeof item !== "string") || (skills.length < 1)) {
  //     return false
  // }
  return true;
};

const levelsValidator = (levels, { req }) => {
  /** levels should be an array */
  // if (!Array.isArray(levels)) {
  //     return false
  // }

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

const createOrGetProgressValidationRules = () => {
  return [
    body("memberId").custom(isValidMemberId),
    body("clubMembershipId").custom(isValidClubMembershipId),
    body("businessId").custom(isValidBusinessId),
    body("evaluationSchemeId").custom(isValidEvaluationSchemeId),
  ];
};

const updateProgressValidationRules = () => {
  return [
    check("name", "name should be at least 3 char")
      .optional()
      .isLength({ min: 3 }),
    check("status", "status should be active / inactive")
      .optional()
      .isIn(EVALUATION_STATUS),
    check("levelCount", "levelCount should be an Integer").optional().isInt(),
    check("levels").optional().isLength({ min: 1 }).custom(levelsValidator),
    check("updatedBy", "updatedBy should be a valid userId").isLength({
      min: 12,
    }),
  ];
};

const markProgressValidationRules = () => {
  return [
    body(
      "status",
      `should be either ${SKILL_PROGRESS_STATUS.join(" / ")}`
    ).isIn(SKILL_PROGRESS_STATUS),
    body("progressId").custom(isValidProgressId),
    body("skillId", "should be a valid id").isMongoId(),
  ];
};

const markMultipleProgressValidationRules = () => {
  return [
    body(
      "skills.*.status",
      `should be either ${SKILL_PROGRESS_STATUS.join(" / ")}`
    ).isIn(SKILL_PROGRESS_STATUS),
    body("progressId").custom(isValidProgressId),
    body("skills.*.skillId", "should be a valid id").isMongoId(),
    body("skills.*.levelId", "should be a valid id").isMongoId(),
  ];
};

module.exports = {
  createOrGetProgressValidationRules,
  updateProgressValidationRules,
  markProgressValidationRules,
  markMultipleProgressValidationRules,
};
