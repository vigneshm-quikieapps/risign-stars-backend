const mongoose = require("mongoose");

const businessActivitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: String,
    businessname: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["sole", "limited", "liability", "partnership"],
    },
    about: {
      type: String,
      maxlength: 3200,
      trim: true,
    },

   evaluationscheme: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
    coachName: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BusinessActivity", businessActivitySchema);
// end
