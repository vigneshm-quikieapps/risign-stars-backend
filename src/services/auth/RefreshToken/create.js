const { sign } = require("jsonwebtoken");

module.exports = (payload) => {
  payload = { ...payload, tokenVersion: 1 };
  return sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
