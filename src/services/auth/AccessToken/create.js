const { sign } = require("jsonwebtoken");

const create = (payload) => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = create;
