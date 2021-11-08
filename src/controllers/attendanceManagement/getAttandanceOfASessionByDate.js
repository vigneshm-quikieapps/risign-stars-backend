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
        $lookup: {
          from: "users",
          localField: "member.userId",
          foreignField: "_id",
          as: "parent",
        },
      },
      {
        $project: {
          _id: 1,
          date: 1,
          classId: 1,
          sessionId: 1,
          member: 1,
          "parent._id": 1,
          "parent.name": 1,
          "parent.email": 1,
          "parent.mobileNo": 1,
          createdAt: 1,
          createdBy: 1,
          updatedAt: 1,
          updatedBy: 1,
        },
      },
      {
        $unwind: "$parent",
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
          "member.parent": "$parent",
        },
      },
      {
        $addFields: {
          "records.member": "$member",
          "records.memberConsent": "$memberConsent",
        },
      },
      {
        $unset: ["member", "memberConsent", "membership", "parent"],
      },
      {
        $group: {
          _id: {
            classId: "$classId",
            sessionId: "$sessionId",
            date: "$date",
            createdAt: "$createdAt",
            createdBy: "$createdBy",
            updatedAt: "$updatedAt",
            updatedBy: "$updatedBy",
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
          records: "$records",
          createdAt: "$_id.createdAt",
          createdBy: "$_id.createdBy",
          updatedAt: "$_id.updatedAt",
          updatedBy: "$_id.updatedBy",
          _id: 0,
        },
      },
    ]);

    // let attendance = null;
    // if (attendances.length >= 1) {
    //   attendance = attendances[0];
    // }

    return res.send({ attendances });
  } catch (err) {
    res.status(422).json({ message: err.message });
  }
};

module.exports = getAttendanceOfASessionByDate;
