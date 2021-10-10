const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const { ENUM_BUSINESS_TYPE, ENUM_STATUS } = require("../constants/business");

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ENUM_STATUS,
      required: true,
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
      enum: ENUM_BUSINESS_TYPE,
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
