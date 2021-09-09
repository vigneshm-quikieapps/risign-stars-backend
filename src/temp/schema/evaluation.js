const EVALUATION_SCHEME_STATUS = require("./constants");

module.exports.EvaluationScheme = {
  name: String,
  status: EVALUATION_SCHEME_STATUS,
  levelcount: Number,
  levels: [
    {
      skills: [],
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
