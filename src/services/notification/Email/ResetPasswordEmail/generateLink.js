const cache = require("../../../cache");
const jwt = require("jsonwebtoken");
const generateToken = require("./generateToken");

const generateLink = async ({ user }) => {
  let token = await generateToken({ user });
  return `${process.env.BASE_URL}/api/account/password/reset/${token}`;
};

module.exports = generateLink;
