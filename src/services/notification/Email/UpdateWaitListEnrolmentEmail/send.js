const sendEmail = require("../sendEmail");
const { FROM } = require("../../../../constants/email");

const send = ({ to }, { userData, businessSessionData, businessClassData }) => {
  const msg = {
    to,
    from: FROM, // Change to your verified sender
    subject: "Enrolled Sucessfull",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${userData.name} has been successfully moved from waitlist to enrolled in ${businessSessionData.name} of ${businessClassData.name}</strong>`,
  };
  sendEmail(msg);
};

module.exports = send;
