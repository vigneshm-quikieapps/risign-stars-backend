const { AttendanceOfAClassByDate } = require("../../../models");

const canAddAttendance = async (date, { req }) => {
  try {
    let { sessionId } = req.body;

    let attendanceExist = await AttendanceOfAClassByDate.count({
      sessionId,
      date,
    });

    if (attendanceExist) {
      throw new Error("Attendance has already been added");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = canAddAttendance;
