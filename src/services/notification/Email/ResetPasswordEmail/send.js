const sendEmail = require("../sendEmail");
const generateLink = require("./generateLink");

const send = async ({ user }) => {
  let link = await generateLink({ user });

  const msg = {
    to: "tomonso.ejang@gmail.com", // Change to your recipient
    from: "sarphu@quikieapps.com", // Change to your verified sender
    subject: "Reset Password",
    text: "and easy to do anywhere, even with Node.js",
    html: `Please click on the following link ${link} to reset your password. \n\n 
    If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  sendEmail(msg);
};

module.exports = send;
