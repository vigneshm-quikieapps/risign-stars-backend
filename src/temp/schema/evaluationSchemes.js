const EVALUATION_SCHEME_STATUS = require("./constants");

module.exports.evaluationSchemes = {
  name: String,
  platformId:
    String /** should be a auto increment unique numeric serial ids */,
  status: EVALUATION_SCHEME_STATUS,
  levelcount: Number,
  levels: [
    {
      skills: [] /** array of strings */,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
