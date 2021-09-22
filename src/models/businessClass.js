const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const businessClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active",
    },
    registrationform: {
      type: String,
      required: true,
      enum: ["standard"],
      default: "standard",
    },
    businessId: {
      type: ObjectId,
      ref: "Business",
      required: true,
    },
    evaluation: {
      type: ObjectId,
      ref: "Evaluation",
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    about: {
      type: String,
      maxlength: 3200,
      trim: true,
    },
    enrolmentControls: [
      {
        prop: String, //ie age
        value: Number, //ie 1-3
      },
    ],
    session: [{
      type: ObjectId,
      ref: "BusinessSession",
    }],

    charges: [
      {
        name: String,
        amount: String,
        mandatory: Boolean,
        payFrequency: {
          type: String,
          enum: ["Monthly", "Annual"],
          default: "Annual",
        },
      },
    ],
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
module.exports = mongoose.model("BusinessClass", businessClassSchema);
