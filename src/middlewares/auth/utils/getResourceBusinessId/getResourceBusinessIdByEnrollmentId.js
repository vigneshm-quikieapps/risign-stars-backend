const { Enrolment } = require("../../../../models");

const getResourceBusinessIdByEnrollmentId = async (req, res) => {
  let { enrolmentId } = req.params;
  //console.log(enrolmentId);

  let enrolment = await Enrolment.findById(enrolmentId);
  if (!enrolment) return false;
  if (enrolment) {
    //console.log(enrolment.businessId);
    return enrolment.businessId.toString();
  }
};
module.exports = getResourceBusinessIdByEnrollmentId;
