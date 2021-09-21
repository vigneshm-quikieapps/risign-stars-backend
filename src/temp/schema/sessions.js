const { ENUM_DAY, ENUM_SESSION_STATUS } = require("./constants");

/**
 * get details of a class
 * update details of a class
 * get class listing
 */
module.exports.sessions = {
  id: String,
  classId: String,
  name: String,
  status: ENUM_SESSION_STATUS,
  pattern: [
    {
      day: ENUM_DAY,
      startTime: Date,
      endTime: Date,
    },
  ],
  term: {
    id: String,
    startDate: Date,
    endDate: Date,
  },
  sessionCapacity: Number,
  sessionEnrolled: Number,
  waitlistCapacity: Number,
  waitlistEnrolled: Number,
  facility: String,
  coach: {
    id: String,
    name: String,
  },
};
