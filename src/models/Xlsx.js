var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const mongoosePaginate = require("mongoose-paginate-v2");

const xlsxSchema = new mongoose.Schema(
  {
    xlsxUrl: {
      type: String,
      required: true,
    },
    batchProcessId: {
      type: String,
      required: true,
    },

    // classsequence: {
    //   type: Number,
    // },
  },
  { timestamps: true }
);

xlsxSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Xlsx", xlsxSchema);
