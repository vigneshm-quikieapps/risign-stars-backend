const { EvaluationScheme } = require("../../../models");

const isValidEvaluationSchemeId = async (evaluationSchemeId, { req }) => {
  try {
    if (!evaluationSchemeId) {
      throw new Error();
    }

    let evaluationScheme = await EvaluationScheme.findById(evaluationSchemeId);

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
