const UnauthorizedError = require("../../../exceptions/UnauthorizedError");
const { Enrolment, Member } = require("../../../models");

const isAuthHandlerByEnrolementIdFromBody = async (req, res) => {
  const enrolmentId = req.body.enrolmentId;
  //console.log("enrolmentId from body:", enrolmentId);
  const enrolment = await Enrolment.findById(enrolmentId);
  if (!enrolment) return false;

  const member = await Member.findById(enrolment.memberId.toString());
  if (!member) return false;
  //console.log("ParentId from member:", member.userId.toString());
  //console.log("ParentId from token:", req.tokenData._id);
  if (req.tokenData._id !== member.userId.toString()) {
    throw new UnauthorizedError();
  }
  return true;
};
module.exports = isAuthHandlerByEnrolementIdFromBody;
