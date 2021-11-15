const sendEmail = require("../sendEmail");
const { FROM } = require("../../../../constants/email");


const send = ({to},{userData,oldSessionData,classData,newSessionData}) => {
  const msg = {
    to,
    from: FROM, // Change to your verified sender
    subject: "Enrolled Sucessfull",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>${userData.name} has been successfully session transfer from ${oldSessionData.name} to ${newSessionData.name} of ${classData.name}</strong>`,
  };
  sendEmail(msg);
};

module.exports = send;
