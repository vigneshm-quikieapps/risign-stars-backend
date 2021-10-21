var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      maxlength: 32,
    },
    businessId: {
      type: ObjectId,
      ref: "Business",
      required: true,
    },
    updatedBy: String,
    createdBy: String,
  },

  { timestamps: true }
);

// Ensure virtual fields are serialised.
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

categorySchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Category", categorySchema);
