const redis = require("redis");

let client;

const getClient = () => {
  console.log("getClient");
  if (!client) {
    console.log("from cache");
    client = redis.createClient();
    client.on("error", function (error) {
      console.error(error);
    });
  }
  return client;
};

/**
 * create a cache single object. taking advantage of the node.js caching mechanism
 * @returns
 */
module.exports = getClient();
