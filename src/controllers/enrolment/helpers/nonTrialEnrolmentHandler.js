const regularEnrolment = require("./regularEnrolment");
const waitlistedEnrolment = require("./waitlistedEnrolment");
const updateSessionStatus = require("./updateSessionStatus");

const nonTrialEnrolmentHandler = async (req, session) => {
  let { businessSessionData } = req;

  let { fullcapacityfilled, fullcapacity, waitcapacity, waitcapacityfilled } =
    businessSessionData;

  let numberOfMembersApplicable = fullcapacity + waitcapacity;
  let numberOfMembersApplied = fullcapacityfilled + waitcapacityfilled;

  /**
   *
   * if total number of students applied is greater than total number of applicable
   * numberOfMembersApplied: number of member applied
   * numberOfMembersApplicable: total number of members applicable should not be greater than the sum of fullCapacity and waitlistCapacity
   */
  if (numberOfMembersApplied >= numberOfMembersApplicable) {
    await updateSessionStatus(req, "ENROLLMENT_CLOSED", session);
    throw new Error("Maximum limit of Enrolment is reached.");
  }

  /**
   * if seats is available in fullCapacity, enrol the member
   * else waitlist the member
   */
  if (fullcapacityfilled < fullcapacity) {
    await regularEnrolment(req, session);

    if (fullcapacity - fullcapacityfilled === 1) {
      await updateSessionStatus(req, "OPEN_FOR_WAITLIST_ENROLLMENT", session);
    } else {
      await updateSessionStatus(req, "OPEN_FOR_ENROLLMENT", session);
    }
    return { message: "Enrolled successful.", status: "ENROLLED" };
  } else {
    // creating enrolment till session capacity
    await waitlistedEnrolment(req, session);
    if (waitcapacity - waitcapacityfilled === 1) {
      await updateSessionStatus(req, "ENROLLMENT_CLOSED", session);
    } else {
      await updateSessionStatus(req, "OPEN_FOR_WAITLIST_ENROLLMENT", session);
    }
    return {
      message: "Enrolled successful in Waitlist.",
      status: "WAITLISTED",
    };
  }
};

module.exports = nonTrialEnrolmentHandler;
