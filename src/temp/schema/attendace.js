/**
 * user will be shown date. and then, user can select a particular date.
 *
 * API's
 * 1. list of the attendance of a class by a particular date.
 * 2. list of the attendance of a class by month
 * 3.
<<<<<<< HEAD
 *
 * Note:
 * Here, members are student (child).
=======
>>>>>>> origin/development
 */

module.exports.AttendanceOfAClassByDate = {
  date: Date,
<<<<<<< HEAD
  sessionId: String,
  classId: String,
  className: String,
  members: [
    {
      id: String /** student id */,
      name: String /** student name */,
=======
  classId: String,
  activityId: String,
  activityName: String,
  members: [
    {
      id: String,
      name: String,
>>>>>>> origin/development
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
<<<<<<< HEAD
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
=======
 * 1. get an attendance of a student by Month
 */
module.exports.AttendaceOfAClassByMonth = {
  month: Date,
  classId: String,
  members: [
    {
      id: String,
      name: String,
>>>>>>> origin/development
      attendedCount: Number,
      tardyCount: Number,
    },
  ],
<<<<<<< HEAD
  classCount: Number,
=======
>>>>>>> origin/development
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
<<<<<<< HEAD
  studentId: String,
  sessionId: String,
  classId: String,
  month: Date,
=======
  startDate: Date /** starting of a month */,
  endDate: Date /** end of a month */,
>>>>>>> origin/development
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
