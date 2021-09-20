const express = require("express");
const router = express.Router();

const {
  createProgressValidationRules,
  updateProgressValidationRules,
} = require("../validations/progress");

const {
  getAllProgress,
  getProgressIdById,
  getProgress,
  updateProgress,
  createProgress,
  addAttendence,
} = require("../controllers/progress");

//parameters
router.param("progressId", getProgressIdById);

// router.param("userId", getuserIdById);

//all of actual routes
//all of actual routes

// create routes
router.post(
  "/progress/create",
  createProgressValidationRules(),
  createProgress
);
// read routes
router.get("/progress/:progressId", getProgress);

//update route
router.put(
  "/progress/:progressId",
  updateProgressValidationRules(),
  updateProgress
);

router.put("/progress/attendance/:progressId", addAttendence);
//listing route
router.get("/progress", getAllProgress);

module.exports = router;
