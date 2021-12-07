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
const { PROGRESS_RECORD } = require("../constants/pages");
const getResourceBusinessIdInCreate = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdInCreate");
const getResourceBusinessIdByProgressIdFromBody = require("../middlewares/auth/utils/getResourceBusinessId/getResourceBusinessIdByProgressIdFromBody");
const { CREATE, UPDATE, READ } = require("../constants/rest");
//parameters
// router.param("progressId", getProgressIdById);
//buss
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
  isAuthorized(PROGRESS_RECORD, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByProgressIdFromBody,
  }),
  markProgressValidationRules(),
  validate,
  markAProgress
);

router.put(
  "/update-multiple-status",
  isAuthorized(PROGRESS_RECORD, UPDATE, {
    getResourceBusinessId: getResourceBusinessIdByProgressIdFromBody,
  }),
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
