const {
  AttendanceOfAClassByMonth,
} = require("../../models/attendanceManagement");
const { ObjectId } = require("mongoose").Types;

/**
 * get all the attendance of a class by month
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttendanceOfASessionByMonth = async (req, res) => {
  try {
    let { month, year, sessionId } = req.body;
    let { classId } = req.sessionData;
    let date = `${year}-${month}-01`;

    // const attendance = await AttendanceOfAClassByMonth.aggregate([
    //   {
    //     $match: {
    //       classId: ObjectId(classId),
    //       sessionId: ObjectId(sessionId),
    //     },
    //   },
    //   {
    //     $addFields: {
    //       month: { $month: { $toDate: "$month" } },
    //       year: { $year: { $toDate: "$month" } },
    //     },
    //   },
    //   {
    //     $match: {
    //       month,
    //       year,
    //     },
    //   },
    // ]);
    let attendance = await AttendanceOfAClassByMonth.findOne({
      classId,
      sessionId,
      date,
    }).populate({ path: "records.memberId", select: "name gender dob" });

    return res.json({ attendance });
  } catch (err) {
    return res.status(422).send({ message: err.message });
  }
};

module.exports = getAttendanceOfASessionByMonth;
