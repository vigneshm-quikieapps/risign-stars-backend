const {
  AttendanceOfAClassByDate,
} = require("../../models/attendanceManagement");

/**
 * get attendance of a member in a class by date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttendanceOfAMemberInAClassByDate = async (req, res) => {
  try {
    let { date, sessionId, memberId } = req.body;

    const attendance = await AttendanceOfAClassByDate.findOne({
      date,
      sessionId,
    }).select({ records: { $elemMatch: { memberId } } });

    if (!attendance) {
      throw new Error("No attendance added.");
    }
    return res.send({ attendance });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = getAttendanceOfAMemberInAClassByDate;
