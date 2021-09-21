const SKILL_PROGRESS_STATUS = require("./constants");

/**
 * API's
 * 1. add a progress record of a student in an class
 * 2. get a progress record of a student in an class
 * 3. update a progress record of a student in an class
 *
 * Notes:
 * 1. MemberActivityEvaluationRecord / ProgressRecord
 * 2. Evaluation Scheme is embedded because:
 * for each student a particular evaluation scheme which is latest (latest means added/updated just before his joining) to his admission date is to be used
 */
module.exports.ProgressRecord = {
  memberId: String,
  memberName: String,
  sessionId: String,
  classId: String,
  className: String,
  levelCount: Number,
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
