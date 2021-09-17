const { promisify } = require("util");
const client = require("./getClient");

/**
 * promisify the get method of redis client
 */
module.exports = promisify(client.get).bind(client);
