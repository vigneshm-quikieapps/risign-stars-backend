const { Member } = require("../../../models");

const isValidMemberId = async (memberId) => {
  try {
    let member = await Member.findById(memberId);

    if (!member) {
      throw new Error("Does not exists");
    }

    return true;
  } catch (err) {
    return Promise.reject(err.message);
  }
};

module.exports = isValidMemberId;
