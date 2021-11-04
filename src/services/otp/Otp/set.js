const cache = require("../../cache");

/** store the value to cache with the specified key */
module.exports = async (key, value, ...options) => {
  cache.set(key, value, ...options);
};
