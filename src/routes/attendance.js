// Created by Prahalad
// routes for attendance management

const express = require("express");
const router = express.Router();

const {
  addAttendance,
  getAttendanceOfASessionByDate,
  getAttendanceOfASessionByMonth,
  getAttendanceOfAMemberInASession,
  getAttendanceOfAMemberInASessionByDate,
  getAttendanceOfAMemberInASessionByMonth,
  testingEndPoint
} = require("../controllers/attendanceManagement");
const validate = require("../validations/validate");

const { isAuthorized } = require("../middlewares/auth");

const vr = require("../validations/attendanceManagment");

// add attendance of a member in a session
router.post(
  "/",
  isAuthorized(null, null),
  vr.addAttendance(),
  validate,
  addAttendance
);

router.get(
  "/testing-endpoint",
  testingEndPoint
);
// get all the attendance of a session by date
router.post(
  "/of-a-session-by-date",
  isAuthorized(null, null),
  vr.getAttendanceOfASessionByDate(),
  validate,
  getAttendanceOfASessionByDate
);

// get all the attendance of a session by month
router.post(
  "/of-a-session-by-month",
  vr.getAttendanceOfASessionByMonth(),
  validate,
  getAttendanceOfASessionByMonth
);

// get attendance of a member in a session
router.post(
  "/of-a-member-in-a-session",
  vr.getAttendanceOfAMemberInASession(),
  validate,
  getAttendanceOfAMemberInASession
);

// get attendance of a member in a session by date
router.post(
  "/of-a-member-in-a-session-by-date",
  vr.getAttendanceOfAMemberInASessionByDate(),
  validate,
  getAttendanceOfAMemberInASessionByDate
);

// get attendance of a member in a session by month
router.post(
  "/of-a-member-in-a-session-by-month",
  vr.getAttendanceOfAMemberInASessionByMonth(),
  validate,
  getAttendanceOfAMemberInASessionByMonth
);

module.exports = router;
