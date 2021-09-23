var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
    updatedBy: String,
    createdBy: String,
  },

  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
