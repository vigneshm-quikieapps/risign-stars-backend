const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");
const { ENUM_DAYS } = require("../constants/session");

const businessSessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    businessId: {
      type: ObjectId,
      ref: "Business",
      immutable: true,
    },
    classId: {
      type: ObjectId,
      ref: "BusinessClass",
      immutable: true,
    },
    term: {
      _id: {
        type: ObjectId,
        required: true,
        ref: "Term",
      },
      label: {
        type: String,
      },
      startDate: {
        type: Date,
        required: true,
        // immutable: true,
      },
      endDate: {
        type: Date,
        required: true,
        // immutable: true,
      },
    },
    pattern: [
      {
        day: {
          type: String,
          enum: ENUM_DAYS,
        },
        startTime: {
          type: Date,
        },
        endTime: {
          type: Date,
        },
      },
    ],
    facility: {
      type: String,
    },
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
    coachId: {
      type: ObjectId,
      ref: "User",
    },
    trialAllowed: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
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
  justOne: true,
});

businessSessionSchema.virtual("class", {
  ref: "BusinessClass",
  localField: "classId",
  foreignField: "_id",
  justOne: true,
});

businessSessionSchema.virtual("business", {
  ref: "Business",
  localField: "businessId",
  foreignField: "_id",
  justOne: true,
});

businessSessionSchema.virtual("termData", {
  ref: "Term",
  localField: "term._id",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtual fields are serialised.
businessSessionSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
  getters: true,
  setters: true,
});

// function getPatternTime(date) {
//   date = new Date(date);
//   let hours = date.getHours();
//   let mins = date.getMinutes();
//   console.log({ hours, mins, hi: "hi" });
//   return `${hours}:${mins}`;
// }

// function setPatternTime(timeString) {
//   let [hour, mins] = timeString.split(":");
//   let date = new Date("2022-01-01");
//   date.setHours(hour);
//   date.setMinutes(mins);
//   return date;
// }

businessSessionSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("BusinessSession", businessSessionSchema);
