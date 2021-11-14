const { AttendanceOfAMemberInAClass } = require("../../../models");
const moment = require("moment");

const getUpdateQuery = (
  recordIntent,
  { record, date, createdBy, updatedBy }
) => {
  switch (recordIntent.status) {
    case "NEW":
      return getNewQuery({ record, date, createdBy, updatedBy });

    case "EXIST":
      return getExistQuery({
        recordIntent,
        record,
        date,
        createdBy,
        updatedBy,
      });

    case "REMOVE":
      return getRemoveQuery({ date });
  }
};

const getExistQuery = ({ recordIntent, record }) => {
  return {
    $set: {
      "records.$[record].attended": record.attended,
    },
    $inc: {
      attendedCount: recordIntent.incAttendedCount,
    },
  };
};

const getNewQuery = ({ date, record, createdBy, updatedBy }) => {
  return {
    $push: {
      records: [
        {
          date,
          attended: record.attended,
          //   comments: record.comments,
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
  };
};

const getRemoveQuery = ({ date }) => {
  return {
    $pull: {
      records: {
        date: { $eq: date },
      },
    },
  };
};

const getArrayFilters = ({ recordIntent, date }) => {
  let arrayFilters = [];
  let nextDate = moment(date).add(1, "day").toDate();

  if (recordIntent.status == "EXIST") {
    arrayFilters.push({
      "record.date": { $gte: date, $lt: nextDate },
    });
  }
  return arrayFilters;
};

const updateAttendanceOfAMemberInAClassHandler = async (
  req,
  { recordIntents },
  { session }
) => {
  let { sessionId, date } = req.body;
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

  let x = Object.values(recordIntents).map((recordIntent) => {
    let { record } = recordIntent;
    let { memberId } = record;
    let updateQuery = getUpdateQuery(recordIntent, {
      record,
      date,
      createdBy,
      updatedBy,
    });

    let filter = {
      memberId,
      classId,
      sessionId,
      month,
    };

    let query = {
      updateOne: {
        filter,
        update: updateQuery,
        // upsert: true,
        // arrayFilters,
      },
    };

    let arrayFilters = getArrayFilters({ recordIntent, date });

    if (arrayFilters.length > 0) {
      query.updateOne.arrayFilters = arrayFilters;
    }
    return query;
  });

  /**
   * this will record the attendance of a member in a particular class in a month
   * it will mark the attendance of each date in the month
   * it will also mark the total attended in a month
   */
  await AttendanceOfAMemberInAClass.bulkWrite(x, { session: session });
};

module.exports = updateAttendanceOfAMemberInAClassHandler;
