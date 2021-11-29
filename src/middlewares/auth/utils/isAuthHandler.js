const UnauthorizedError = require("../../../exceptions/UnauthorizedError");
const { Member } = require("../../../models");

const isAuthHandler = async (req, res) => {
  const memberId = req.body.memberId;
  //console.log("memberId from body:", memberId);
  const member = await Member.findById(memberId);
  if (!member) return false;
  //console.log("ParentId from member:", member.userId.toString());
  //console.log("ParentId from token:", req.tokenData._id);
  if (req.tokenData._id !== member.userId.toString()) {
    throw new UnauthorizedError();
  }
  return true;
};
module.exports = isAuthHandler;