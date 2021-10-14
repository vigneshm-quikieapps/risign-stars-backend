const { STATUS_RETURN_FROM_SUSPENSION } = require("../../constants/enrolment");
const { Bill } = require("../../models");

const activateAllFutureBills = async (data, session) => {
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
    $set: { status: STATUS_RETURN_FROM_SUSPENSION },
  };
  await Bill.updateMany(condition, updateData).session(session);
};

module.exports = activateAllFutureBills;
