const sendEmail = require("../sendEmail");
const { FROM } = require("../../../../constants/email");

const send = (user) => {
  const msg = {
    to: user.email,
    from: FROM,
    subject: "Enrolled Sucessfull",
    text: "and easy to do anywhere, even with Node.js",
    html: `<strong>Welcome ${user.name}</strong>`,
  };
  sendEmail(msg);
};

module.exports = send;
