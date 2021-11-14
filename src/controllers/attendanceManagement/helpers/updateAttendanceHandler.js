const moment = require("moment");
const {
  AttendanceOfAClassByDate,
  AttendanceOfAMemberInAClass,
} = require("../../../models");
const updateAttendanceOfAClassByMonth = require("./updateAttendanceOfAClassByMonth");
const updateAttendanceOfAMemberInAClassHandler = require("./updateAttendanceOfAMemberInAClassHandler");

const updateAttendanceHandler = async (req, { recordIntents }, { session }) => {
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
        updatedBy,
      },
    },
    { new: true, useFindAndModify: false, upsert: true }
  ).session(session);

  await updateAttendanceOfAMemberInAClassHandler(
    req,
    { recordIntents },
    { session }
  );

  await updateAttendanceOfAClassByMonth(req, { recordIntents }, { session });
};

module.exports = updateAttendanceHandler;
