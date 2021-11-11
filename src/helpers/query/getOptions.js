const getOptions = (req) => {
  let { limit, page, sortBy, sortByCreatedAt } = req.query;

  let options = {};

  if (limit) {
    options.limit = parseInt(limit);
  }

  if (page) {
    options.page = parseInt(page);
  }

  if (sortBy) {
    let nameSortBy = sortBy === "asc" ? 1 : -1;
    options.sort = { name: nameSortBy };
  }

  if (sortByCreatedAt) {
    let dateSortBy = sortByCreatedAt === "asc" ? 1 : -1;
    options.sort = { createdAt: dateSortBy };
  }

  return options;
};

module.exports = getOptions;
