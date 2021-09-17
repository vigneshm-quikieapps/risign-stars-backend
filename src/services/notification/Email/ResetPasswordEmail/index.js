const send = require("./send");
const generateLink = require("./generateLink");
const verifyLink = require("./verifyLink");
const verifyToken = require("./verifyToken");
const decodeToken = require("./decodeToken");
const generateToken = require("./generateToken");

const ResetPasswordEmail = {
  send,
  generateLink,
  verifyLink,
  verifyToken,
  decodeToken,
  generateToken,
};

module.exports = ResetPasswordEmail;
