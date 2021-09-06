/**
 * user will be shown date. and then, user can select a particular date.
 *
 * API's
 * 1. list of the attendance of a class by a particular date.
 * 2. list of the attendance of a class by month
 * 3.
 */

module.exports.AttendanceOfAClassByDate = {
  date: Date,
  classId: String,
  activityId: String,
  activityName: String,
  members: [
    {
      id: String,
      name: String,
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
 * 1. get an attendance of a student by Month
 */
module.exports.AttendaceOfAClassByMonth = {
  month: Date,
  classId: String,
  members: [
    {
      id: String,
      name: String,
      attendedCount: Number,
      tardyCount: Number,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
