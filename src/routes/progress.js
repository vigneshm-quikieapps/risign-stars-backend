const express = require("express");
const router = express.Router();


const {
  getAllProgress,
  getProgressIdById,
  getProgress,
  updateProgress,
} = require("../controllers/progress");

//parameters
router.param("progress", getProgressIdById);

// router.param("userId", getuserIdById);


//all of actual routes
//all of actual routes


// read routes
router.get("/progress/:progressId", getProgress);


//update route
router.put(
  "/progress/:progressId",
  // updateEvaluationValidationRules(),
  updateProgress
);

//listing route
router.get("/progress", getAllProgress);

module.exports = router;
