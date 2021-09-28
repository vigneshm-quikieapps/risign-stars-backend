const { EvaluationScheme, BusinessClass } = require("../../../models");

const processSkill = (skill) => {
  return { name: skill, status: "NOT_STARTED" };
};

const processLevel = (level) => {
  return { skills: level.skills.map(processSkill), status: "NOT_STARTED" };
};

const genLevelsData = (evaluation) => {
  return evaluation.levels.map(processLevel);
};

/**
 * In case of class transfer
 * this is not required, as the same progress record will be used in the new session
 */
const classTransferprogressPayloadRequest = async (req) => {
  let { enrolmentData } = req;
  let { memberId, classId, businessId } = enrolmentData;
  let businessClass = await BusinessClass.findById(enrolmentData.classId);
  let evaluation = await EvaluationScheme.findById(businessClass.evaluationId);
  let { levelCount } = evaluation;
  let levels = genLevelsData(evaluation);
  return {
    memberId,
    sessionId: req.body.newSessionId,
    classId,
    businessId,
    levelCount,
    levels,
  };
};

module.exports = classTransferprogressPayloadRequest;
