const { Progress } = require("../../../../models");

const getResourceBusinessIdByProgressIdFromBody = async (req, res) => {
  let { progressId } = req.body;
  //console.log(progressId);

  let progress = await Progress.findById(progressId);
  if (!progress) return false;
  if (progress) {
    //console.log(progress.businessId);
    return progress.businessId.toString();
  }
};
module.exports = getResourceBusinessIdByProgressIdFromBody;
