const express = require("express");
const router = express.Router();

const {
  createOrGetProgressValidationRules,
  markProgressValidationRules,
} = require("../validations/progress");

const {
  getAllProgress,
  getProgressIdById,
  getProgress,
  markAProgress,
  updateProgress,
  createOrGetProgress,
  addAttendence,
} = require("../controllers/progress");
const validate = require("../validations/validate");

//parameters
// router.param("progressId", getProgressIdById);

// create routes
router.post(
  "/",
  createOrGetProgressValidationRules(),
  validate,
  createOrGetProgress
);

// mark progress
router.put(
  "/update-status",
  markProgressValidationRules(),
  validate,
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
