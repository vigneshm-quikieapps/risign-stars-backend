/* eslint-disable prettier/prettier */
const express = require("express");
const router = express.Router();
const {
  createEvaluationValidationRules,
  updateEvaluationValidationRules,
} = require("../validations/evaluation");

const {
  getAllEvaluations,
  getEvaluationIdById,
  getEvaluation,
  createEvaluation,
  deleteEvaluation,
  updateEvaluation,
} = require("../controllers/evaluation");
const validate = require("../validations/validate");

//parameters
router.param("evaluationId", getEvaluationIdById);

// router.param("userId", getuserIdById);

//all of actual routes
//all of actual routes
//create route
router.post("/", createEvaluationValidationRules(), validate, createEvaluation);

// read routes
router.get("/:evaluationId", getEvaluation);

//delete route
router.delete("/:evaluationId", deleteEvaluation);

//update route
router.put(
  "/:evaluationId",
  updateEvaluationValidationRules(),
  validate,
  updateEvaluation
);

//listing route
router.get("/", getAllEvaluations);

module.exports = router;
