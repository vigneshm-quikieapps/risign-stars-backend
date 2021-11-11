const auditCreatedBy = (req, payload) => {
  if (req.authUserData) {
    if (!payload) {
      return req.authUserData._id;
    }
    payload.createdBy = req.authUserData._id;
  }
  return payload;
};

module.exports = auditCreatedBy;
