const { Enrolment } = require("../../../models");

const isValidEnrolmentId = async (enrolmentId, { req }) => {
  try {
    let enrolment = await Enrolment.findById(enrolmentId);

    if (!enrolment) {
      throw new Error("Does not exists");
    }

    req.enrolmentData = enrolment;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid enrolment Id");
  }
};

module.exports = isValidEnrolmentId;
