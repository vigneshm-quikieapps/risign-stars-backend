// Created by Prahalad
// validation for attendance management

const { check } = require("express-validator");
const { Enrolment } = require("../models");
const { BUSINESS_SESSION, BUSINESS_CLASS } = require("./constants");
const { ObjectId } = require("mongoose").Types;
const { STATUS_ENROLLED } = require("../constants/enrolment");
const {
  isValidSessionId,
  isValidSessionDate,
  isValidMemberId,
} = require("./helpers");
const { canAddAttendance } = require("./helpers/attendance");

const isMembersPartOfTheSession = async (sessionId, { req }) => {
  try {
    let { records } = req.body;
    let memberIds = records.map((record) => ObjectId(record.memberId));

    let enrolledCount = await Enrolment.count({
      sessionId,
      enrolledStatus: STATUS_ENROLLED,
    });

    let membersIsPartOfSessionCount = await Enrolment.count({
      sessionId,
      memberId: { $in: memberIds },
      enrolledStatus: STATUS_ENROLLED,
    });

    if (
      enrolledCount !== membersIsPartOfSessionCount ||
      membersIsPartOfSessionCount != memberIds.length
    ) {
      throw new Error(
        "Attendance of all Members in the Session should be added together."
      );
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

// validation for add attendance of members in a session
module.exports.addAttendance = () => {
  return [
    check("sessionId", BUSINESS_SESSION.ID.MESSAGE).custom(isValidSessionId),
    // .bail()
    // .custom(isMembersPartOfTheSession),
    check("date", "should be: YYYY-MM-DD")
      .isDate({
        format: "YYYY-MM-DD",
        strictMode: true,
      })
      .bail()
      .custom(isValidSessionDate),
    // .bail()
    // .custom(canAddAttendance),
    check("records", "should be a array").isArray(),
    check("records.*.memberId", "should be a valid Member id").isMongoId(),
    check("records.*.attended", "should be a boolean").isBoolean(),
    check("records.*.comments", "should be a array").optional(),
  ];
};

// validation for get all the attendance of a session by date
module.exports.getAttendanceOfASessionByDate = () => {
  return [
    check("sessionId", BUSINESS_SESSION.ID.MESSAGE).custom(isValidSessionId),
    check("date", "should be: YYYY-MM-DD")
      .isDate({
        format: "YYYY-MM-DD",
        strictMode: true,
      })
      .bail()
      .custom(isValidSessionDate),
  ];
};

// validation for get the attendance of a session by month
module.exports.getAttendanceOfASessionByMonth = () => {
  return [
    check("sessionId", BUSINESS_SESSION.ID.MESSAGE).custom(isValidSessionId),
    check("month", "should be a Number between 1 to 12").isInt({
      min: 1,
      max: 12,
    }),
    check("year", "format: YYYY. eg: 2021").isInt({
      min: 2021,
      max: 2050,
    }),
  ];
};

module.exports.getAttendanceOfAMemberInASession = () => {
  return [
    check("sessionId", BUSINESS_SESSION.ID.MESSAGE).custom(isValidSessionId),
    check("memberId").custom(isValidMemberId),
  ];
};

// validation for get attendance of a member in a session by date
module.exports.getAttendanceOfAMemberInASessionByDate = () => {
  return [
    check("sessionId", BUSINESS_SESSION.ID.MESSAGE).custom(isValidSessionId),
    check("date", "should be: YYYY-MM-DD").isDate({
      format: "YYYY-MM-DD",
      strictMode: true,
    }),
    check("memberId").custom(isValidMemberId),
  ];
};

// validation for get attendance of a member in a session by month
module.exports.getAttendanceOfAMemberInASessionByMonth = () => {
  return [
    check("sessionId", BUSINESS_SESSION.ID.MESSAGE).custom(isValidSessionId),
    check("memberId").custom(isValidMemberId),
    check("month", "should be a Number between 1 to 12").isInt({
      min: 1,
      max: 12,
    }),
    check("year", "format: YYYY. eg: 2021").isInt(),
  ];
};
