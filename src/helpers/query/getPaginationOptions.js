const getQuery = require("./getQuery");
const getOptions = require("./getOptions");

const getPaginationOptions = (req) => {
  const query = getQuery(req);
  const options = getOptions(req);
  return { query, options };
};
module.exports = getPaginationOptions;
