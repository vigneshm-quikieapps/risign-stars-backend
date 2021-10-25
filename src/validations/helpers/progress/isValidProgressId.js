const { Progress } = require("../../../models");

const isValidProgressId = async (progressId, { req }) => {
  try {
    let progress = await Progress.findById(progressId);

    if (!progress) {
      throw new Error("Does not exists");
    }

    req.progressData = progress;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid progress Id");
  }
};

module.exports = isValidProgressId;
