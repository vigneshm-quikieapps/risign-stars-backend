const mongoose = require("mongoose");
const {
  ENUM_PAY_FREQUENCY,
  PAY_FREQUENCY_ANNUAL,
  ENUM_STATUS,
  BUSINESS_STATUS_ACTIVE,
} = require("../contants/business");
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
      enum: ENUM_STATUS,
      default: BUSINESS_STATUS_ACTIVE,
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
    evaluationId: {
      type: ObjectId,
      ref: "Evaluation",
      required: true,
    },
    categoryId: {
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
        type: {
          type: String,
          enum: ["SELECT", "RADIO"],
          default: "SELECT",
        },
        name: {
          type: String,
          enum: ["age", "gender"],
        },
        values: [],
        /** should be an array of values from 1 to 16, It is going to be multi select dropdown in UI */
      },
    ],
    sessionIds: [
      {
        type: ObjectId,
        ref: "BusinessSession",
      },
    ],
    charges: [
      {
        name: String,
        amount: Number,
        mandatory: Boolean,
        payFrequency: {
          type: String,
          enum: ENUM_PAY_FREQUENCY,
          default: PAY_FREQUENCY_ANNUAL,
        },
      },
    ],
    updatedBy: {
      type: String,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("BusinessClass", businessClassSchema);
