const sgMail = require("@sendgrid/mail");
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

if (!SENDGRID_API_KEY) {
  console.warn("SENDGRID_API_KEY is not set in .env file");
  console.warn("Sending Email might not work");
}

sgMail.setApiKey(SENDGRID_API_KEY);

/**
 * send
 * @param {*} msg
 */
module.exports = (msg) => {
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
