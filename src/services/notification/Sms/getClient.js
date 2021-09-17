const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

if (!accountSid || !authToken) {
  console.warn(
    "TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN is not set in .env file"
  );
  console.warn("sending SMS might not work");
}

const client = require("twilio")(accountSid, authToken);

module.exports = client;
