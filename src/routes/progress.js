const express = require("express");
const router = express.Router();

const {
    createEvaluationValidationRules,
    updateEvaluationValidationRules,
  } = require("../validations/evaluation");

const {
  getAllProgress,
  getProgressIdById,
  getProgress,
  updateProgress,
  createProgress,
} = require("../controllers/progress");

//parameters
router.param("progressId", getProgressIdById);

// router.param("userId", getuserIdById);


//all of actual routes
//all of actual routes


// create routes
router.post(
    "/progress/create",
    createEvaluationValidationRules(),
    createProgress
  );
// read routes
router.get("/progress/:progressId", getProgress);


//update route
router.put(
  "/progress/:progressId",
  updateEvaluationValidationRules(),
  updateProgress
);

//listing route
router.get("/progress", getAllProgress);

module.exports = router;
