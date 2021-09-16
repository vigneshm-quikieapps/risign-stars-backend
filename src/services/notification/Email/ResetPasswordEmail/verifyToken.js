const cache = require("../../../cache");
const decodeToken = require("./decodeToken");

const verifyToken = async ({ token }) => {
  let userId = decodeToken(token);
  /** if userId, then token is valid,  */

  let key = `resetPassword:${userId}`;
  let validToken = await cache.get(key);

  if (validToken !== token) {
    /** if not equal, then token must have expired */
    throw new Error("Token Expired");
  }

  return userId;
};

module.exports = verifyToken;
