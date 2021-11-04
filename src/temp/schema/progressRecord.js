const SKILL_PROGRESS_STATUS = require("./constants");

/**
 * API's
 * 1. add a progress record of a member in an club
 * 2. get a progress record of a member in an club
 * 3. update a progress record of a member in an club
 *
 * Notes:
 * 1. MemberActivityEvaluationRecord / ProgressRecord
 * 2. levelCount and levels are constructed using Evaluation Scheme:
 * for each member a particular evaluation scheme which is latest (latest means added/updated just before his joining) to his admission date is to be used
 */
module.exports.ProgressRecord = {
  memberId: String,
  businessId: String,
  levelCount: Number,
  evaluationSchemeId: String,
  levels: [
    {
      skills: [
        {
          name: String,
          status: SKILL_PROGRESS_STATUS,
          startedAt: Date /** when the skill is marked as inProgress */,
          completedAt: Date /** when the shill is marked as attained */,
        },
      ],
      status: ["NOT_STARTED", "IN_PROGRESS", "AWARDED"],
    },
  ],
  createdAt: Date,
  createdBy: String /** User id */,
  updatedAt: Date,
  updatedBy: String /** User id */,
};
