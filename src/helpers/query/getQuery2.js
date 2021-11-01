const {
  STARTS_WITH_FILTER,
  EQUALS_FILTER,
  BY_ID_FILTER,
  NOT_EQUALS_FILTER,
} = require("../../constants/constant");

const getQuery2 = (filters = []) => {
  let query = {};

  for (let { field, type, value } of filters) {
    console.log({ field, type, value });
    switch (type) {
      case STARTS_WITH_FILTER:
        query[field] = { $regex: new RegExp(`^${value}`, "i") };
        break;
      case EQUALS_FILTER:
        query[field] = value;
        break;
      case NOT_EQUALS_FILTER:
        query[field] = { $ne: value };
        break;
      case BY_ID_FILTER:
        query[field] = value;
        break;

      default:
        break;
    }
  }

  return query;
};

module.exports = getQuery2;
