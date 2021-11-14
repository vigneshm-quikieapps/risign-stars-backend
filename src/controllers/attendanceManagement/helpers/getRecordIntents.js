const getRecordIntents = (storedRecords, reqRecords) => {
  let currentRecords = JSON.parse(JSON.stringify(storedRecords));
  let newRecords = JSON.parse(JSON.stringify(reqRecords));

  let recordIntents = {};

  for (const newRecord of newRecords) {
    let index = currentRecords.findIndex(
      (record) => record.memberId == newRecord.memberId
    );

    if (index > -1) {
      /** record already exists */

      let incAttendedCount = 0;

      if (currentRecords[index].attended) {
        incAttendedCount = newRecord.attended ? 0 : -1;
      } else {
        incAttendedCount = newRecord.attended ? 1 : 0;
      }

      recordIntents[newRecord.memberId] = {
        status: "EXIST",
        record: newRecord,
        incAttendedCount,
      };
    } else {
      /** new record */
      recordIntents[newRecord.memberId] = {
        status: "NEW",
        record: newRecord,
        incAttendedCount: newRecord.attended ? 1 : 0,
      };
    }
    currentRecords.splice(index, 1);
  }

  for (const currentRecord of currentRecords) {
    /** record has been removed */
    recordIntents[currentRecord.memberId] = {
      status: "REMOVE",
      record: currentRecord,
    };
  }

  return recordIntents;
};

module.exports = getRecordIntents;
