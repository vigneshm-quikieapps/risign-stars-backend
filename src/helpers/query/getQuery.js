const {
  STARTS_WITH_FILTER,
  EQUALS_FILTER,
} = require("../../constants/constant");

const getQuery = (req) => {
  let query = {};

  let { filters = [] } = req.query;
  filters = filters.map((filter) => JSON.parse(filter));

  for (let { field, type, value } of filters) {
    switch (type) {
      case STARTS_WITH_FILTER:
        query[field] = { $regex: new RegExp(`^${value}`, "i") };
        break;
      case EQUALS_FILTER:
        query[field] = value;
        break;
      default:
        break;
    }
  }

  return query;
};

module.exports = getQuery;
