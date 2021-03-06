/**
 * user will be shown date. and then, user can select a particular date.
 *
 * API's
 * 1. list of the attendance of a class by a particular date.
 * 2. list of the attendance of a class by month
 * 3.
 *
 * Note:
 * Here, members are member (child).
 */

module.exports.AttendanceOfAClassByDate = {
  date: Date,
  sessionId: String,
  classId: String,
  className: String,
  members: [
    {
      id: String /** member id */,
      name: String /** member name */,
      attended: Boolean,
      comments: String,
    },
  ],
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};

/**
 * API's
 * 1. get an attendance of a class by Month/Quarterly/Half Yearly/Yearly
 */
module.exports.AttendaceOfAClassByMonth = {
  id: String,
  month: Date,
  sessionId: String,
  classId: String,
  members: [
    {
      id: String /** member id */,
      name: String /** member name */,
      attendedCount: Number,
    },
  ],
  classCount: Number,
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};

/**
 * API's
 * 1. get attendance of a member in a class by date
 * 2. get attendance of a member in a class by month
 */
module.exports.AttendanceOfAStudentInAClass = {
  id: String,
  memberId: String,
  sessionId: String,
  classId: String,
  month: Date,
  records: [
    {
      date: Date,
      attended: Boolean,
      comments: String,
    },
  ],
  attendedCount: Number,
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};
