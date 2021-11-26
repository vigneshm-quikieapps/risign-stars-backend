const UnauthorizedError = require("../../../exceptions/UnauthorizedError");
const { Member } = require("../../../models");

const isAuthHandler = async (req, res) => {
  const memberId = req.body.memberId;
  const member = await Member.findById(memberId);
  if (req.tokenData._id !== member.userId) {
    throw new UnauthorizedError();
  }
  return true;
};
module.exports = isAuthHandler;
