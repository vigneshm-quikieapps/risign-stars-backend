const jwt = require("jsonwebtoken");

const verify = (token) => {
  try {
    let accessToken = token.split(" ")[1];
    let decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return decoded._id;
  } catch (err) {
    console.err(err);
    throw new Error("Invalid Access Token");
  }
};

module.exports = verify;
