const businessClass = require("../models/businessClass");
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

module.exports.classIdValidation = async (Class) => {
  try {
    if (!Class) {
      throw new Error();
    }

    let cls = await businessClass.findById(Class);
    if (!cls) {
      throw new Error();
    }

    return true;
  } catch (err) {
    return Promise.reject(`Please select a valid term`);
  }
};
