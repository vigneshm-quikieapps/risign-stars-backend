const { AttendanceOfAMemberInAClass } = require("../../models");
const { ObjectId } = require("mongoose").Types;

const getAttendanceOfAMemberInASession = async (req, res) => {
  try {
    let { sessionId, memberId } = req.body;
    let { classId } = req.sessionData;

    let match1 = {
      $match: {
        classId: ObjectId(classId),
        sessionId: ObjectId(sessionId),
        memberId: ObjectId(memberId),
      },
    };

    let group1 = {
      $group: {
        _id: {
          sessionId: "$sessionId",
          classId: "$classId",
          memberId: "$memberId",
        },
        records: { $push: "$records" },
        attendedCount: { $sum: "$attendedCount" },
      },
    };

    let addField1 = {
      $addFields: {
        classId: "$_id.classId",
        sessionId: "$_id.sessionId",
        memberId: "$_id.memberId",
        records: {
          $reduce: {
            input: "$records",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
        totalCount: { $size: "$records" },
      },
    };

    let attendances = await AttendanceOfAMemberInAClass.aggregate([
      match1,
      group1,
      addField1,
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    let attendance = [];
    if (attendances.length) {
      attendance = attendances[0];
    }

    return res.send({ attendance });
  } catch (err) {
    console.log(err);
    return res.status(422).send({ message: err.message });
  }
};

module.exports = getAttendanceOfAMemberInASession;
