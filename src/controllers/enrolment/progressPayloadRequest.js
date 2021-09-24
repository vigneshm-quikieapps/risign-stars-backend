const { BusinessClass, EvaluationScheme } = require("../../models");

const processSkill = (skill) => {
  return { name: skill, status: "NOT_STARTED" };
};

const processLevel = (level) => {
  return { skills: level.skills.map(processSkill), status: "NOT_STARTED" };
};

const genLevelsData = (evaluation) => {
  return evaluation.levels.map(processLevel);
};

const progressPayloadRequest = (req) => {
  let { sessionData } = req;
  let data = req.body;
  let businessClass = BusinessClass.findById(sessionData.classId);
  let evaluation = EvaluationScheme.findById(businessClass.evaluationId);
  let levels = genLevelsData(evaluation);

  return {
    memberId: data.memberId,
    sessionId: sessionData.id,
    classId: sessionData.classId,
    businessId: sessionData.businessId,
    levelCount: evaluation.levelCount,
    levels,
  };
};

module.exports = progressPayloadRequest;
