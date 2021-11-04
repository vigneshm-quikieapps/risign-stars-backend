const { sign } = require("jsonwebtoken");

const createAccessToken = (user) => {
  return sign({ _id: user.id }, "dipak", {
    expiresIn: "1h",
  });
};

module.exports = createAccessToken;
