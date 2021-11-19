var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const termSchema = new mongoose.Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "Business",
      required: true,
      immutable: true,
    },
    label: {
      type: String,
      trim: true,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    updatedBy: {
      type: ObjectId,
      ref: "User",
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
    },
    termFee:{
      type:Number,
      required: true,
    }
    // classsequence: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

termSchema.virtual("business", {
  ref: "Business",
  localField: "businessId",
  foreignField: "_id",
  justOne: true,
});

// Ensure virtual fields are serialised.
termSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

termSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Term", termSchema);
