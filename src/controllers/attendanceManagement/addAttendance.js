const mongoose = require("mongoose");
const {
  AttendanceOfAClassByDate,
} = require("../../models/attendanceManagement");
const addAttendanceHandler = require("./helpers/addAttendanceHandler");
const getRecordIntents = require("./helpers/getRecordIntents");
const updateAttendanceHandler = require("./helpers/updateAttendanceHandler");

/**
 * add attendance of members in a session for a particular date
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addAttendance = async (req, res) => {
  const session = await mongoose.startSession();

  let { sessionId, date, records } = req.body;
  date = new Date(date);

  session.startTransaction();

  try {
    let attendanceOfAClassByDate = await AttendanceOfAClassByDate.findOne({
      sessionId,
      date,
    });

    if (attendanceOfAClassByDate) {
      let recordIntents = getRecordIntents(
        attendanceOfAClassByDate.records,
        records
      );
      await updateAttendanceHandler(req, { recordIntents }, { session });
    } else {
      await addAttendanceHandler(req, { session });
    }

    await session.commitTransaction();

    return res.status(201).send({ message: "Attendance added successfully." });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();

    return res.status(422).send({ message: err.message });
  } finally {
    session.endSession();
  }
};

module.exports = addAttendance;
