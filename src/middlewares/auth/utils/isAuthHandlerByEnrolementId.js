const UnauthorizedError = require("../../../exceptions/UnauthorizedError");
const { Enrolment, Member } = require("../../../models");

const isAuthHandlerByEnrolementId = async (req, res) => {
  const enrolmentId = req.params.enrolmentId;
  //console.log("enrolmentId from body:", enrolmentId);
  const enrolment = await Enrolment.findById(enrolmentId);
  if (!enrolment) throw new UnauthorizedError();

  const member = await Member.findById(enrolment.memberId.toString());
  if (!member) throw new UnauthorizedError();

  //console.log("ParentId from member:", member.userId.toString());
  //console.log("ParentId from token:", req.tokenData._id);
  if (req.tokenData._id !== member.userId.toString()) {
    throw new UnauthorizedError();
  }
  return true;
};
module.exports = isAuthHandlerByEnrolementId;
