const { verify } = require("jsonwebtoken");

const decodeToken = (token) => {
  try {
    let decoded = verify(token, process.env.RESET_PASSWORD_TOKEN_SECRET);
    return decoded._id;
  } catch (err) {
    console.error(err);
    throw new Error("Invalid Reset Password Token");
  }
};

module.exports = decodeToken;
