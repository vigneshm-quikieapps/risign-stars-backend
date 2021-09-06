module.exports.EvaluationScheme = {
  name: String,
  status: ["active", "inactive"],
  levelcount: Number,
  levels: [
    {
      skills: [],
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
