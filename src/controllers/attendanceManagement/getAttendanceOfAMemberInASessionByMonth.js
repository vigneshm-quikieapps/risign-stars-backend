const { AttendanceOfAClassByMonth } = require("../../models");
const { ObjectId } = require("mongoose").Types;

/**
 * get attendance of a member in a class by date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttendanceOfAMemberInASessionByMonth = async (req, res) => {
  try {
    let { memberId, sessionId, year, month } = req.body;
    let { classId } = req.sessionData;
    const attendance = await AttendanceOfAClassByMonth.aggregate([
      {
        $project: {
          year: { $year: "$month" },
          month: { $month: "$month" },
          classId: "$classId",
          sessionId: "$sessionId",
          members: {
            $filter: {
              input: "$records",
              as: "record",
              cond: { $eq: ["$$record.memberId", ObjectId(memberId)] },
            },
          },
          classCount: 1,
        },
      },
      {
        $match: {
          month,
          year,
          classId: ObjectId(classId),
          sessionId: ObjectId(sessionId),
        },
      },
    ]);

    if (!attendance) {
      throw new Error("Attendance not found.");
    }
    return res.send({ attendance });
  } catch (err) {
    return res.status(422).json({ message: err.message });
  }
};

module.exports = getAttendanceOfAMemberInASessionByMonth;
