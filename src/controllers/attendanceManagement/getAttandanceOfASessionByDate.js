const {
  AttendanceOfAClassByDate,
} = require("../../models/attendanceManagement");
const { ObjectId } = require("mongoose").Types;

/**
 * get all the attendance of a class by date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttendanceOfASessionByDate = async (req, res) => {
  try {
    let { sessionId, date } = req.body;
    let { classId, businessId } = req.sessionData;

    // const attendance = await AttendanceOfAClassByDate.findOne({
    //   date,
    //   classId,
    //   sessionId,
    // }).populate({ path: "records.memberId", select: "name gender dob" });

    let attendances = await AttendanceOfAClassByDate.aggregate([
      {
        $match: {
          date: new Date(date),
          classId: ObjectId(classId),
          sessionId: ObjectId(sessionId),
        },
      },
      {
        $unwind: "$records",
      },
      {
        $lookup: {
          from: "members",
          localField: "records.memberId",
          foreignField: "_id",
          as: "member",
        },
      },
      {
        $unwind: "$member",
      },
      {
        $addFields: {
          membership: {
            $filter: {
              input: "$member.membership",
              as: "membership",
              cond: { $eq: ["$$membership.businessId", ObjectId(businessId)] },
            },
          },
        },
      },
      {
        $unwind: "$membership",
      },
      {
        $lookup: {
          from: "memberconsents",
          localField: "membership.clubMembershipId",
          foreignField: "clubMembershipId",
          as: "memberConsent",
        },
      },
      {
        $unwind: "$memberConsent",
      },
      {
        $addFields: {
          "records.member": "$member",
          "records.memberConsent": "$memberConsent",
        },
      },
      {
        $unset: ["member", "memberConsent", "membership"],
      },
      {
        $group: {
          _id: {
            classId: "$classId",
            sessionId: "$sessionId",
            date: "$date",
          },
          records: {
            $push: "$records",
          },
        },
      },
      {
        $project: {
          classId: "$_id.classId",
          sessionId: "$_id.sessionId",
          date: "$_id.date",
          _id: 0,
          records: "$records",
        },
      },
    ]);

    let attendance = null;
    if (attendances.length >= 1) {
      attendance = attendances[0];
    }

    return res.send({ attendance });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = getAttendanceOfASessionByDate;
