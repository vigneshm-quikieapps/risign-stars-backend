/**
 * user will be shown date. and then, user can select a particular date.
 *
 * API's
 * 1. list of the attendance of a class by a particular date.
 * 2. list of the attendance of a class by month
 * 3.
 *
 * Note:
 * Here, members are student (child).
 */

module.exports.AttendanceOfAClassByDate = {
  date: Date,
  sessionId: String,
  classId: String,
  className: String,
  members: [
    {
      id: String /** student id */,
      name: String /** student name */,
      attended: Boolean,
      tardy: Boolean,
      comments: String,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
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
      id: String /** student id */,
      name: String /** student name */,
      attendedCount: Number,
      tardyCount: Number,
    },
  ],
  classCount: Number,
  createdAt: Date,
  updatedAt: Date,
};

/**
 * API's
 * 1. get attendance of a student in a class by date
 * 2. get attendance of a student in a class by month
 */
module.exports.AttendanceOfAStudentInAClass = {
  id: String,
  studentId: String,
  sessionId: String,
  classId: String,
  month: Date,
  records: [
    {
      date: Date,
      attended: Boolean,
      tardy: Boolean,
      comments: String,
    },
  ],
  attendedCount: Number,
  tardyCount: Number,
  createdAt: Date,
  updatedAt: Date,
};
