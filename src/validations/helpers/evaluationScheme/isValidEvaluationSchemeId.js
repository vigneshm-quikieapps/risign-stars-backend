const { EvaluationScheme } = require("../../../models");

const isValidEvaluationSchemeId = async (memberId, { req }) => {
  try {
    let evaluationScheme = await EvaluationScheme.findById(memberId);

    if (!evaluationScheme) {
      throw new Error("Does not exists");
    }

    req.evaluationSchemeData = evaluationScheme;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid evaluation scheme Id");
  }
};

module.exports = isValidEvaluationSchemeId;
