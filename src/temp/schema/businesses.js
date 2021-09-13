const { ENUM_BUSINESS_TYPE } = require("./constants");

module.exports.businesses = {
  id: String,
  platformId:
    String /** should be a auto increment unique numeric serial ids */,
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
};
