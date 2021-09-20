const Term = require("../models/Term");

module.exports.termIdValidation = async (term) => {
  try {
    if (!term) {
      throw new Error();
    }

    let terms = await Term.findById(term);
    if (!terms) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid term`);
  }
};
