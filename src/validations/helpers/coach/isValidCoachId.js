const { User } = require("../../../models");

const isValidCoachId = async (coachId, { req }) => {
  try {
    if (!coachId) {
      throw new Error();
    }

    let coach = await User.findById(coachId);

    if (!coach) {
      throw new Error("Does not exists");
    }

    req.coachData = coach;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid coach Id");
  }
};

module.exports = isValidCoachId;
