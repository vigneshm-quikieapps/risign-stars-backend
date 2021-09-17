const { EvaluationScheme } = require("./evaluation");

const SKILL_PROGRESS_STATUS = ["NOT_STARTED", "IN_PROGRESS", "ATTAINED"];

/**
 * API's
 * 1. get a list of activity
 * 2. CRUD activity
 * 3. get charges/fees of an activity
 * 4.
 * 5.
 */
module.exports.Activity = {
  _id: String,
  name: String,
  businessId: String,
  status: [String],
  registrationForm: [String],
  evaluationScheme: String,
  about: String,
  enrolmentControls: [
    {
      type: "age",
      value: 3,
    },
  ],
  classes: [
    /** class ids */
  ],
  charges: [
    {
      name: String,
      amount: String,
      mandatory: Boolean,
      payFrequency: ["Monthly", "Annual"],
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};

/**
 * API's
 * 1. add a progress record of a student in an activity
 * 2. get a progress record of a student in an activity
 * 3. update a progress record of a student in an activity
 *
 * Notes:
 * 1. MemberActivityEvaluationRecord / ProgressRecord
 * 2. Evaluation Scheme is embedded because:
 * for each student a particular evaluation scheme which is latest (latest means added/updated just before his joining) to his admission date is to be used
 */
module.exports.ProgressRecord = {
  studentId: String,
  studentName: String,
  activityId: String,
  activityName: String,
  evaluationScheme: EvaluationScheme,
  levels: [
    {
      skills: [
        {
          name: String,
          status: "string",
          startedAt: Date /** when the skill is marked as inProgress */,
          completedAt: Date /** when the shill is marked as attained */,
        },
      ],
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
