const { sign } = require("jsonwebtoken");

const create = (payload) => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

module.exports = create;
