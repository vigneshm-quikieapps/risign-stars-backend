const client = require("../../notification/Sms/getClient");

/**
 * validating mobileNo: using lookup phone number using twilio.
 * @param {*} phoneNumber
 */
module.exports = async (phoneNumber) => {
  return client.lookups.v1.phoneNumbers(phoneNumber).fetch();
};
