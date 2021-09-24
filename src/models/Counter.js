const mongoose = require("mongoose");
const {
  ENUM_COUNTER_TYPES,
  CLUB_MEMBERSHIP_ID,
} = require("../contants/counter");

// Declare the Schema of the Mongo model
var counterSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ENUM_COUNTER_TYPES,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    sequence_value: {
      type: Number,
      required: true,
    },
  },
  { timestamp: true }
);

counterSchema.index({ type: 1, year: -1 });

counterSchema.statics.genClubMemberShipId = async function (business, session) {
  let year = new Date().getFullYear();
  let filter = { type: CLUB_MEMBERSHIP_ID, year, businessId: business.id };
  let update = {
    type: CLUB_MEMBERSHIP_ID,
    year,
  };

  let options = { upsert: true, new: true };
  if (session) {
    options = { ...options, session };
  }

  let counter = await this.findOne(filter);

  /** if counter record doesn't exists, add with the initial value, set increment by 1 */
  if (!counter) {
    update = { ...update, sequence_value: 1001 };
  } else {
    update = { $inc: { sequence_value: 1 } };
  }

  counter = await this.findOneAndUpdate(filter, update, options);

  let { sequence_value } = counter;
  let twoDigityear = year.slice(2);

  return `${business.code}${twoDigityear}${sequence_value}`;
};

//Export the model
module.exports = mongoose.model("Counter", counterSchema);
