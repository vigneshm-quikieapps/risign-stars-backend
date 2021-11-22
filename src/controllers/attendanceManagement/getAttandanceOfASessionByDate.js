const mongoose = require("mongoose");
const {
  AttendanceOfAClassByDate,
} = require("../../models/attendanceManagement");
const { ObjectId } = require("mongoose").Types;
const { Enrolment } = require("../../models");
const addAttendanceHandler = require("./helpers/addAttendanceHandler");

/**
 * get all the attendance of a class by date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getAttendanceOfASessionByDate = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let { sessionId, date } = req.body;
    let { classId, businessId } = req.sessionData;

    // const attendance = await AttendanceOfAClassByDate.findOne({
    //   date,
    //   classId,
    //   sessionId,
    // }).populate({ path: "records.memberId", select: "name gender dob" });

    let attendances = await aggregateResponse(sessionId,date,classId,businessId);

    let attendance = null;
    if (attendances.length >= 1) {
      attendance = attendances[0];
    }else{
      let startDate=req.sessionData.startDate;
      let endDate=req.sessionData.endDate;
      let date1 = new Date(date);
      if(date1>=startDate && date1<=endDate){
        let enrolments = await Enrolment.find({sessionId:sessionId,startDate:{$lte: date1 }});
        if(enrolments.length==0){
          throw new Error("No enrollments are there");
        }
          // create the record for the members
        req.body.records=[];
        for(let i=0;i<enrolments.length;i++){
            let recordObj = {
              'memberId':enrolments[i].memberId,
              'attended':false,
              'comments':''
            }
            req.body.records.push(recordObj);
         }
        await addAttendanceHandler(req, { session });
        await session.commitTransaction();
        attendances = await aggregateResponse(sessionId,date,classId,businessId);
        if(attendances.length >= 1) {
          attendance = attendances[0];
        }
        
      }
    }

    return res.send({ attendance });
  } catch (err) {
    await session.abortTransaction();
    res.status(422).json({ message: err.message });
  }finally {
    session.endSession();
  }
};

const aggregateResponse = async (sessionId,date,classId,businessId) => { 
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
        from: "enrolments",
        localField: "member._id",
        foreignField: "memberId",
        as: "enrolments",
      },
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
      $unwind: "$parent",
    },
    {
      $project: {
        _id: 1,
        date: 1,
        classId: 1,
        sessionId: 1,
        member: 1,
        records: 1,
        "parent._id": 1,
        "parent.name": 1,
        "parent.email": 1,
        "parent.mobileNo": 1,
        enrolments:1,
        createdAt: 1,
        createdBy: 1,
        updatedAt: 1,
        updatedBy: 1,
      },
    },
    {
      $addFields: {
        enrolment: {
          $filter: {
            input: "$enrolments",
            as: "enrolment",
            cond: { $and: [ 
              { $eq: ["$$enrolment.sessionId", ObjectId(sessionId)]},
              { $eq: ["$$enrolment.memberId", "$member._id"]}
             ]},
          },
        },
      },
    },
    {
      $unwind: "$enrolment",
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
        "member.enrolment": "$enrolment",
      },
    },
    {
      $addFields: {
        "records.member": "$member",
        "records.memberConsent": "$memberConsent",
      },
    },
    {
      $unset: ["member", "memberConsent", "membership", "parent","enrolments","enrolment"],
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
  
  return attendances
}

module.exports = getAttendanceOfASessionByDate;
