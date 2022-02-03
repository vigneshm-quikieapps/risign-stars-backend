/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  createEvaluationValidationRules,
  updateEvaluationValidationRules,
} = require("../validations/evaluation");
const { isAuthorized } = require("../middlewares/auth");
const { EVALUATION_SCHEME } = require("../constants/pages");
const { CREATE, READ, UPDATE, DELETE } = require("../constants/rest");

const {
  getAllEvaluations,
  // getEvaluationIdById,
  getEvaluation,
  createEvaluation,
  deleteEvaluation,
  updateEvaluation,
} = require("../controllers/evaluation");
const validate = require("../validations/validate");
//parameters
// router.param("evaluationId", getEvaluationIdById);
//create route
router.post(
  "/",
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  isAuthorized(EVALUATION_SCHEME, CREATE),
  createEvaluationValidationRules(),
  validate,
  createEvaluation
);

// read routes
router.get("/:evaluationSchemeId", isAuthorized(null, null), getEvaluation);

//delete route
router.delete(
  "/:evaluationSchemeId",
  isAuthorized(EVALUATION_SCHEME, DELETE),
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  deleteEvaluation
);

//Update route
router.put(
  "/:evaluationSchemeId",
  // isAuthorized(null, null, { isSuperAdminOnly: true }),
  isAuthorized(EVALUATION_SCHEME, UPDATE),
  updateEvaluationValidationRules(),
  validate,
  updateEvaluation
);

//listing route
router.get("/", getAllEvaluations);

module.exports = router;
