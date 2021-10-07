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
  markAProgress,
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
  "/create",
  // createProgressValidationRules(),
  createProgress
);

// mark progress
router.put(
  "/update-status",
  // createProgressValidationRules(),
  markAProgress
);

//update route
// router.put(
//   "/progress/:progressId",
//   updateProgressValidationRules(),
//   updateProgress
// );

// router.put("/progress/attendance/:progressId", addAttendence);
// //listing route
// router.get("/progress", getAllProgress);

module.exports = router;
