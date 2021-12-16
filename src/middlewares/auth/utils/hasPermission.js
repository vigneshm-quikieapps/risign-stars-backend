const hasFunctionalPrivileges = require("./hasFunctionalPrivileges");
const hasAccessToBusiness = (businessId, authUserData) => {
  let { dataPrivileges } = authUserData;
  if (!dataPrivileges) {
    return false;
  }
  if (dataPrivileges.all) return true;

  return dataPrivileges.list.includes(businessId);
};

const hasPermission = (businessId, { page, action }, authUserData) => {
  if (!hasAccessToBusiness(businessId, authUserData)) return false;
  const { roles } = authUserData;
  //checks whether the user has the functional privileges / permission
  let roleIndex = roles.findIndex(({ functionalPrivileges }) =>
    hasFunctionalPrivileges(functionalPrivileges, { page, action })
  );

  return roleIndex > -1;
};

module.exports = hasPermission;
