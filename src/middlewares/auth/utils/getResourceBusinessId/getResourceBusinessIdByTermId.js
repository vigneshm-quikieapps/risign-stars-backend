const { Term } = require("../../../../models");

const getResourceBusinessIdByTermId = async (req, res) => {
  let termId = req.params.termId;
  //console.log("termId:", termId);

  let term = await Term.findById(termId);
  if (!term) return false;
  if (term) {
    //console.log("term from termId:", term.businessId);
    return term.businessId.toString();
  }
};
module.exports = getResourceBusinessIdByTermId;
