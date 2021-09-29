const { BusinessClass, EvaluationScheme } = require("../../../models");

const processSkill = (skill) => {
  return { name: skill, status: "NOT_STARTED" };
};

const processLevel = (level) => {
  return { skills: level.skills.map(processSkill), status: "NOT_STARTED" };
};

const genLevelsData = (evaluation) => {
  return evaluation.levels.map(processLevel);
};

const progressPayloadRequest = async (req, enrolment) => {
  let { businessSessionData } = req;
  let { memberId } = req.body;
  let businessClass = await BusinessClass.findById(businessSessionData.classId);
  let evaluation = await EvaluationScheme.findById(businessClass.evaluationId);
  let { levelCount } = evaluation;
  let levels = genLevelsData(evaluation);
  let { classId, businessId, id } = businessSessionData;

  return {
    enrolmentId: enrolment.id,
    memberId,
    sessionId: id,
    classId: classId.toString(),
    businessId: businessId.toString(),
    levelCount,
    levels,
  };
};

module.exports = progressPayloadRequest;
