const { Member } = require("../../../models");

const isValidMemberId = async (memberId, { req }) => {
  try {
    let member = await Member.findById(memberId);

    if (!member) {
      throw new Error("Does not exists");
    }

    req.memberData = member;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid member Id");
  }
};

module.exports = isValidMemberId;
