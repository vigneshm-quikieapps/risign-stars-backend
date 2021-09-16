const redis = require("redis");

let client;

const onConnect = () => {
  console.log("connected to redis");
};

const onError = (error) => {
  let redisTroubleshoot = [
    {
      hint: "redis connection",
    },
    {
      hint: "Please check your internet connection",
    },
    {
      hint: "if your .env has the following configured: REDIS_HOSTNAME, REDIS_PORT, REDIS_PASSWORD",
    },
  ];
  console.error(error);
  console.error("Redis Error: Please check the following");
  console.table(redisTroubleshoot);
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
