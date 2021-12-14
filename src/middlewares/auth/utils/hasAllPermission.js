const { DATA_PRIVILEGES_ALL } = require("../../../constants/constant");

const hasAllPermission = (tokenPayload) => {
  // let { dataPrivileges } = tokenPayload;
  // if (!dataPrivileges) {
  //   return false;
  // }
  // return dataPrivileges.some(
  //   (dataPriv) => dataPriv.type === DATA_PRIVILEGES_ALL
  // );\
  return false
};

module.exports = hasAllPermission;
