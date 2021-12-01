const UnauthorizedError = require("../../../exceptions/UnauthorizedError");
const { Member } = require("../../../models");

const isAuthHandlerFromParams = async (req, res) => {
  const memberId = req.params.memberId;
  //console.log("memberId from body:", memberId);
  const member = await Member.findById(memberId);
  if (!member) throw new UnauthorizedError();

  //console.log("ParentId from member:", member.userId.toString());
  //console.log("ParentId from token:", req.tokenData._id);
  if (req.tokenData._id !== member.userId.toString()) {
    throw new UnauthorizedError();
  }
  return true;
};
module.exports = isAuthHandlerFromParams;
