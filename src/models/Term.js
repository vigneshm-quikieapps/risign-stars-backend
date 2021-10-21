var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const termSchema = new mongoose.Schema(
  {
    businessId: {
      type: ObjectId,
      ref: "Business",
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      trim: true,
      required: true,
    },
    startdate: {
      type: Date,
      required: true,
    },
    enddate: {
      type: Date,
      required: true,
    },
    classsequence: {
      type: Number,
      required: true,
    },
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
termSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

termSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Term", termSchema);
