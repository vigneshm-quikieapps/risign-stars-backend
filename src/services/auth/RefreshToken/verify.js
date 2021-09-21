const jwt = require("jsonwebtoken");

module.exports = (token) => {
  try {
    var decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded._id;
  } catch (err) {
    throw new Error("Invalid Refresh Token");
  }
};
