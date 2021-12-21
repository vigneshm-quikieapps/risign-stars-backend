const { sign } = require("jsonwebtoken");

const create = (payload) => {
  return sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 5 * 60,
  });
};

module.exports = create;
