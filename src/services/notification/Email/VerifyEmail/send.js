const sendEmail = require("../sendEmail");

module.exports = ({ to, otp }) => {
  const msg = {
    to: "tomonso.ejang@gmail.com", // Change to your recipient
    from: "sarphu@quikieapps.com", // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${otp} is the OTP for your email verification</strong>`,
  };
  sendEmail(msg);
};
