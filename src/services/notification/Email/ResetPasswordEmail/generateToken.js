const cache = require("../../../cache");
const { sign } = require("jsonwebtoken");

const generateToken = async ({ user }) => {
  let token = sign({ _id: user.id }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  let key = `resetPassword:${user.id}`;
  await cache.set(key, token, "EX", 3600);
  return token;
};

module.exports = generateToken;
