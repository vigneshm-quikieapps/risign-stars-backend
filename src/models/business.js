const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: String,
    tradename: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["sole", "limited", "liability", "partnership"],
    },
    about: {
      type: String,
      maxlength: 3200,
      trim: true,
    },

    postcode: {
      type: String,
      required: true,
      trim: true,
    },
    line1: {
      type: String,
      required: true,
      trim: true,
    },
    line2: {
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
    facebok: String,
    instagram: String,
    linkedin: String,
    pinterest: String,
    imageUrl: String,
    updatedBy: {
      type: ObjectId,
      ref: "User",
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Business", businessSchema);
// end
