const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const businessSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    businessId: {
      type: ObjectId,
      ref: "Business",
    },
    term: {
      _id: {
        type: ObjectId,
        required: true,
        ref: "Term",
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    pattern: [
      {
        day: {
          type: String,
          enum: ["mon", "tue", "wed", "thu", "fri", "sat", "sun"],
        },
        starttime: Date,
        endtime: Date,
      },
    ],
    fullcapacity: {
      type: Number,
      default: 30,
    },
    fullcapacityfilled: {
      type: Number,
      default: 0,
    },
    waitcapacity: {
      type: Number,
      default: 10,
    },
    waitcapacityfilled: {
      type: Number,
      default: 0,
    },
    classId: {
      type: ObjectId,
      ref: "BusinessClass",
    },
    coachId: {
      type: ObjectId,
      ref: "User",
    },
    trialAllowed: {
      type: Boolean,
      default: false,
    },
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

businessSessionSchema.virtual("coach", {
  ref: "User",
  localField: "coachId",
  foreignField: "_id",
});

businessSessionSchema.virtual("class", {
  ref: "BusinessClass",
  localField: "classId",
  foreignField: "_id",
});

businessSessionSchema.virtual("business", {
  ref: "Business",
  localField: "businessId",
  foreignField: "_id",
});

// Ensure virtual fields are serialised.
businessSessionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

businessSessionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("BusinessSession", businessSessionSchema);
