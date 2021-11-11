const getOptions = (req) => {
  let { limit, page, sortBy, sortByDate } = req.query;

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

  if (sortByDate) {
    let dateSortBy = sortByDate === "asc" ? 1 : -1;
    options.sort = { createdAt: dateSortBy };
  }

  return options;
};

module.exports = getOptions;
