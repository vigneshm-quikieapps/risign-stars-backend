const client = require("./getClient");
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_ID;

/**
 * send sms to phone number
 * @param {*} param0
 */
module.exports = async ({ body, to }) => {
  if (!messagingServiceSid) {
    /**
     * Please add messaging service id to .env file
     */
    throw new Error("Invalid Messaging Service Id");
  }

  return client.messages.create({
    body,
    messagingServiceSid,
    to,
  });
};
