const sendEmail = require("../sendEmail");
const { FROM } = require("../../../../constants/email");

const send = (
  { to },
  { userData, businessSessionData, businessClassData, newSession }
) => {
  // arguments sending from send function has to match with the parameters.
  const msg = {
    to,
    from: FROM, // Change to your verified sender
    subject: "Enrolled Sucessfull",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${userData.name} has been successfully session transfer from ${businessSessionData.name} to ${newSession.name} of ${businessClassData.name}</strong>`,
  };
  sendEmail(msg);
};

module.exports = send;
