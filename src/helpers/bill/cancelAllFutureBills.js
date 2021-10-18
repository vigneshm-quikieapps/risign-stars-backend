const { Bill } = require("../../models");
const { STATUS_CANCELLED } = require("../../constants/bill");

/**
 * cancel all future bills
 * @param {*} data
 * @param {*} session
 */
const cancelAllFutureBills = async (data, session) => {
  let { memberId, sessionData } = data;
  let { classId } = sessionData;
  let now = new Date();

  /**
   * mark all future bills as CANCELLED
   */
  let condition = {
    memberId,
    classId,
    billDate: { $gt: now },
  };
  let updateData = {
    $set: { status: STATUS_CANCELLED },
  };
  await Bill.updateMany(condition, updateData).session(session);
};

module.exports = cancelAllFutureBills;
