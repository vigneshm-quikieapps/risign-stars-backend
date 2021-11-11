const express = require("express");
const router = express.Router();

const {
  createOrGetProgressValidationRules,
  markProgressValidationRules,
  markMultipleProgressValidationRules,
} = require("../validations/progress");

const {
  getAllProgress,
  getProgressIdById,
  getProgress,
  markAProgress,
  updateProgress,
  createOrGetProgress,
  addAttendence,
  multipleProgressMarking,
} = require("../controllers/progress");
const validate = require("../validations/validate");
const { isAuthorized } = require("../middlewares/auth");

//parameters
// router.param("progressId", getProgressIdById);

// create routes
router.post(
  "/",
  isAuthorized(null, null),
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

router.put(
  "/update-multiple-status",
  markMultipleProgressValidationRules(),
  validate,
  multipleProgressMarking
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
