const { sign } = require("jsonwebtoken");

const create = (payload) => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    // expiresIn: process.env.NODE_ENV === "production" ? 5 * 60 : "7d",
    expiresIn: "7d",
  });
};

module.exports = create;
