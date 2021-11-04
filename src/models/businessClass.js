const mongoose = require("mongoose");
const {
  ENUM_PAY_FREQUENCY,
  ENUM_STATUS,
  CLASS_STATUS_ACTIVE,
  ENUM_REGISTRATION_FORM,
  REGISTRATION_FORM_STANDARD,
  ENROLMENT_CONTROL_AGE,
} = require("../constants/class");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

/**
 * check README.md in the current directory
 */
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
      default: CLASS_STATUS_ACTIVE,
    },
    registrationform: {
      type: String,
      required: true,
      enum: ENUM_REGISTRATION_FORM,
      default: REGISTRATION_FORM_STANDARD,
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
          enum: ENROLMENT_CONTROL_AGE,
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

// Ensure virtual fields are serialised.
businessClassSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

businessClassSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("BusinessClass", businessClassSchema);
