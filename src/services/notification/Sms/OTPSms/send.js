const client = require("../getClient");
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_ID;

/**
 * send sms to phone number
 * @param {*} param0
 */
const send = async ({ to, body }) => {
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

module.exports = send;
