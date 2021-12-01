const { BusinessClass } = require("../../../../models");

const getResourceBusinessIdForSession = async (req, res) => {
  let classId = req.body.classId;
  //console.log("classId:", classId);

  let businessClass = await BusinessClass.findById(classId);
  if (!businessClass) return false;
  if (businessClass) {
    //console.log("bussinessId from businessClass:", businessClass.businessId);
    return businessClass.businessId.toString();
  }
};
module.exports = getResourceBusinessIdForSession;
