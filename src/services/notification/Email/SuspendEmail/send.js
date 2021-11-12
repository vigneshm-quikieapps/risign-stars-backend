const sendEmail = require("../sendEmail");
const { FROM } = require("../../../../constants/email");


const send = ({to}) => {
  const msg = {
    to,
    from: FROM, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>Suspension successful</strong>`,
  };
  sendEmail(msg);
};

module.exports = send;
