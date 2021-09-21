const cache = require("../../../cache");

const verifyLink = async ({ token }) => {
  let key = `resetPassword:${token}`;
  return cache.get(key);
};

module.exports = verifyLink;
