const mongoose = require("mongoose");
const {
  AttendanceOfAClassByDate,
  AttendanceOfAClassByMonth,
  AttendanceOfAMemberInAClass,
} = require("../../models/attendanceManagement");
const moment = require("moment");

/**
 * add attendance of members in a session for a particular date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addAttendance = async (req, res) => {
  const session = await mongoose.startSession();

  let { sessionId, date, records } = req.body;
  let { sessionData } = req;
  let { classId } = sessionData;
  let month = moment(date).format("YYYY-MM-01");

  let { authUserData } = req;

  let createdBy = {
    _id: authUserData._id,
    name: authUserData.name,
  };

  let updatedBy = {
    _id: authUserData._id,
    name: authUserData.name,
  };

  date = new Date(date);
  month = new Date(month);

  session.startTransaction();

  try {
    /**
     * record attendance of a session for a particular date
     * this will mark the attendance of each member attended
     */
    await AttendanceOfAClassByDate.updateOne(
      { date },
      {
        $set: {
          classId,
          sessionId,
          date,
          records,
          createdBy,
        },
      },
      { new: true, useFindAndModify: false, upsert: true }
    ).session(session);

    /**
     * this will record the attendance of a member in a particular class in a month
     * it will mark the attendance of each date in the month
     * it will also mark the total attended in a month
     */
    await AttendanceOfAMemberInAClass.bulkWrite(
      records.map((record) => ({
        updateOne: {
          filter: {
            memberId: record.memberId,
            classId,
            sessionId,
            month,
          },
          update: {
            $push: {
              records: [
                {
                  date,
                  attended: record.attended,
                  comments: record.comments,
                },
              ],
            },
            $setOnInsert: {
              createdBy,
            },
            $set: {
              updatedBy,
            },
            $inc: { attendedCount: record.attended && 1 },
          },
          upsert: true,
        },
      })),
      { session: session }
    );

    /**
     * attendance of a class by month
     */
    const monthAvaliability = await AttendanceOfAClassByMonth.findOne({
      month,
    }).session(session);

    if (!monthAvaliability) {
      await AttendanceOfAClassByMonth.bulkWrite(
        records.map((record) => ({
          updateOne: {
            filter: {
              month,
              classId,
              sessionId,
              classCount: 0,
            },
            update: {
              $push: {
                records: {
                  memberId: record.memberId,
                  attendedCount: 0,
                },
              },
              $setOnInsert: {
                createdBy,
              },
              $set: {
                updatedBy,
              },
            },
            upsert: true,
          },
        })),
        { session: session }
      );
    }

    await AttendanceOfAClassByMonth.bulkWrite(
      records.map((record) => ({
        updateOne: {
          filter: {
            month,
            classId,
            sessionId,
            "records.memberId": record.memberId,
          },
          update: {
            $inc: {
              "records.$.attendedCount": record.attended && 1,
            },
            $set: {
              updatedBy,
            },
          },
          // upsert: true
        },
      })),
      { session: session }
    );

    await AttendanceOfAClassByMonth.updateOne(
      {
        month,
        classId,
        sessionId,
      },
      {
        $inc: { classCount: 1 },
        $set: { updatedBy },
      },
      { new: true, useFindAndModify: false }
    ).session(session);

    await session.commitTransaction();

    return res.status(201).send({ message: "added successful" });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();

    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = addAttendance;
