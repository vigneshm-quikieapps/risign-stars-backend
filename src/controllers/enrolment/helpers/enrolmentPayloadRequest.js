const { getEnrolmentStartDate } = require("../../../helpers/dates");

/**
 * @param {*} req
 * @returns
 */
const enrolmentPayloadRequest = (req) => {
  let { memberId } = req.body;
  let { classId, businessId, id, term, pattern } = req.businessSessionData;
  let { clubMembershipId } = req;

  return {
    sessionId: id,
    classId,
    businessId,
    memberId,
    clubMembershipId,
    startDate: getEnrolmentStartDate({ term, pattern }),
    registeredDate: new Date(),
  };
};

module.exports = enrolmentPayloadRequest;
