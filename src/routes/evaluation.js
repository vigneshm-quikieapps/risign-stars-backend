/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  createEvaluationValidationRules,
  updateEvaluationValidationRules,
} = require("../validations/evaluation");

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
router.post("/", createEvaluationValidationRules(), validate, createEvaluation);

// read routes
router.get("/:evaluationSchemeId", getEvaluation);

//delete route
router.delete("/:evaluationSchemeId", deleteEvaluation);

//update route
router.put(
  "/:evaluationSchemeId",
  updateEvaluationValidationRules(),
  validate,
  updateEvaluation
);

//listing route
router.get("/", getAllEvaluations);

module.exports = router;
