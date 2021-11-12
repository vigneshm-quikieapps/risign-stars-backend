const Member = require("../../../models/Member");
const User = require("../../../models/User");

const findUserEmail = async (memberId) => {
  let member = await Member.findById({_id:memberId});
  let userId = member.userId;
  let user = await User.findById({_id:userId});
  let email = user.email;
  return email
};

module.exports = findUserEmail;