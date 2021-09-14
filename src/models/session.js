const mongoose = require("mongoose");
const { ENUM_BUSINESS_TYPE } = require("../contants/constant");
const sessionSchema = new mongoose.Schema(
    {
    id: String,
    platformId:
      String,
    name: String,
    code: String,
    tradename: String,
    type: ENUM_BUSINESS_TYPE,
    about: String,
    postcode: String,
    line1: String,
    line2: String,
    city: String,
    country: String,
  },
  { timestamps: true }
  );
  
  module.exports = mongoose.model("Session", sessionSchema);