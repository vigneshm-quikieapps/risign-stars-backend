const { Term } = require("../../../models");

const isValidTermId = async (termId, { req }) => {
  try {
    let term = await Term.findById(termId);

    if (!term) {
      throw new Error("Invalid Term Id");
    }

    req.termData = term;

    return true;
  } catch (err) {
    return Promise.reject("should be a valid term id");
  }
};

module.exports = isValidTermId;
