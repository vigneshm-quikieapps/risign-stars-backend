const regularEnrolment = require("./regularEnrolment");
const waitlistedEnrolment = require("./waitlistedEnrolment");

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
    throw new Error("Maximum limit of enrolment is reached");
  }

  /**
   * if seats is available in fullCapacity, enrol the member
   * else waitlist the member
   */
  if (fullcapacityfilled < fullcapacity) {
    await regularEnrolment(req, session);
    return { message: "enrolled successful", status: "ENROLLED" };
  } else {
    // creating enrolment till session capacity
    await waitlistedEnrolment(req, session);
    return { message: "enrolled successful in waitlist", status: "WAITLISTED" };
  }
};

module.exports = nonTrialEnrolmentHandler;
