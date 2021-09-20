const { DATA_PRIVILEGES_ALL } = require("../../../contants/constant");

const hasAllPermission = (tokenPayload) => {
  let { dataPrivileges } = tokenPayload;
  if (!dataPrivileges) {
    return false;
  }
  return dataPrivileges.some(
    (dataPriv) => dataPriv.type === DATA_PRIVILEGES_ALL
  );
};

module.exports = hasAllPermission;
