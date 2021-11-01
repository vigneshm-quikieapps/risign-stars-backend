const {
  AttendanceOfAClassByDate,
} = require("../../models/attendanceManagement");

/**
 * get all the attendance of a class by date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttendanceOfASessionByDate = async (req, res) => {
  try {
    let { sessionId, date } = req.body;
    let { classId } = req.sessionData;

    const attendance = await AttendanceOfAClassByDate.findOne({
      date,
      classId,
      sessionId,
    }).populate({ path: "records.memberId", select: "name gender dob" });

    if (!attendance) {
      throw new Error("No attendance added.");
    }
    return res.send({ attendance });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = getAttendanceOfASessionByDate;
