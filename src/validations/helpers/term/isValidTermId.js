const { Term } = require("../../../models");

const isValidTermId = async (termId) => {
  try {
    console.log("h1");
    console.log({ termId });
    let term = await Term.findById(termId);

    if (!term) {
      throw new Error("Invalid Term Id");
    }

    console.log("okay");
    return true;
  } catch (err) {
    return Promise.reject("Invalid Term Id");
  }
};

module.exports = isValidTermId;
