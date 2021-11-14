const { AttendanceOfAClassByMonth } = require("../../../models");
const moment = require("moment");

const updateAttendanceOfAClassByMonth = async (
  req,
  { recordIntents },
  { session }
) => {
  let { sessionId, date } = req.body;
  let { sessionData } = req;
  let { classId } = sessionData;
  let month = moment(date).format("YYYY-MM-01");

  let x = Object.values(recordIntents).map((recordIntent) => {
    let { record } = recordIntent;

    let filter = {
      month,
      classId,
      sessionId,
      "records.memberId": record.memberId,
    };

    let update = {
      $inc: {
        "records.$.attendedCount": recordIntent.incAttendedCount,
      },
    };

    return {
      updateOne: {
        filter,
        update,
      },
    };
  });

  await AttendanceOfAClassByMonth.bulkWrite(x, { session: session });
};

module.exports = updateAttendanceOfAClassByMonth;
