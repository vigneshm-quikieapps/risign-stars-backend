const client = require("./getClient");
const { promisify } = require("util");

/**
 * promisify the set method of redis client
 */
module.exports = promisify(client.set).bind(client);
