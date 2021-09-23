const cache = require("../../cache");

/**
 * get the value from cache
 * @param {*} key
 * @returns
 */
module.exports = async (key) => {
  return cache.get(key);
};
