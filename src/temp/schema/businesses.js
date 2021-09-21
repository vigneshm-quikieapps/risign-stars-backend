const { ENUM_BUSINESS_TYPE, ENUM_BUSINESS_STATUS } = require("./constants");

module.exports.businesses = {
  id: String,
  platformId:
    String /** should be a auto increment unique numeric serial ids */,
  registeredName: String,
  code: String,
  status: ENUM_BUSINESS_STATUS,
  contact: {
    name: String,
    email: String,
    telephone: String,
    mobile: String,
  },
  tradename: String,
  type: ENUM_BUSINESS_TYPE,
  about: String,
  postcode: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  country: String,
  social: {
    facebook: String,
  },
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};
