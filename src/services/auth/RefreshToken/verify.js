const jwt = require("jsonwebtoken");

module.exports = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error("Invalid Refresh Token");
  }
};
