const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};

module.exports = createAccessToken;
