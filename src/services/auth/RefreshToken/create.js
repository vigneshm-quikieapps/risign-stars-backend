const { sign } = require("jsonwebtoken");

module.exports = (payload) => {
  return sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
