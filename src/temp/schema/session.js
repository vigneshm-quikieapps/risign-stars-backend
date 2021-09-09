const { ENUM_DAY } = require("./constants");

/**
 * get details of a class
 * update details of a class
 * get class listing
 */
module.exports.sessions = {
  id: String,
  sessionId: String,
  sessionName: String,
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
  classCapacity: Number,
  waitlistCapacity: Number,
  waitlistEnrolled: Number,
  facility: String,
  coach: {
    id: String,
    name: String,
  },
};
