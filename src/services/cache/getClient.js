const redis = require("redis");

let client;

const onConnect = () => {
  console.log("connected to redis");
};

const onError = (error) => {
  console.error(error);
  console.error(
    "Please check redis connection OR Please check your internet connection"
  );
};

let host = process.env.REDIS_HOSTNAME || "localhost";
let port = process.env.REDIS_PORT || 6379;
let password = process.env.REDIS_PASSWORD || "";

const getClient = (options) => {
  if (!client) {
    client = redis.createClient(options);
    client.on("connect", onConnect);
    client.on("error", onError);
  }
  return client;
};

/**
 * create a cache single object. taking advantage of the node.js caching mechanism
 * @returns
 */
module.exports = getClient({ host, port, password });
