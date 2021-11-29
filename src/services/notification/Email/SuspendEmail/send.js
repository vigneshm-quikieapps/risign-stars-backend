const sendEmail = require("../sendEmail");
const { FROM } = require("../../../../constants/email");

const send = ({ to }, { userData, sessionData, classData }) => {
  const msg = {
    to,
    from: FROM, // Change to your verified sender
    subject: "Enrolled Sucessfull",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${userData.name} has been successfully suspended in ${sessionData.name} of ${classData.name}</strong>`,
  };
  sendEmail(msg);
};

module.exports = send;
