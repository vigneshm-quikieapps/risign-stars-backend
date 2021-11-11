const auditUpdatedBy = (req, payload) => {
  if (req.authUserData) {
    if (!payload) {
      return req.authUserData._id;
    }
    payload.updatedBy = req.authUserData._id;
  }
  return payload;
};

module.exports = auditUpdatedBy;
