const getResourceBusinessIdInCreate = (req, res) => {
  if (req.body.businessId) {
    return req.body.businessId;
  } else {
    return false;
  }
};
module.exports = getResourceBusinessIdInCreate;
