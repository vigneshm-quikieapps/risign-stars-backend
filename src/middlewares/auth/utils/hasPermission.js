const hasFunctionalPrivileges = require("./hasFunctionalPrivileges");

const hasPermission = (businessId, roles, { page, action }, tokenPayload) => {
  //restricts bussiness admin from accessing other bussiness class
  const hasAccess = tokenPayload.dataPrivileges.find((bussiness) => {
    console.log("nor here", bussiness.businessId.toString());

    if (bussiness.businessId.toString() === businessId) {
      return true;
    }
  });
  if (!hasAccess) {
    return false;
  }
  //checks whether the user has the functional previlages / permission
  let roleIndex = roles.findIndex(({ functionalPrivileges }) =>
    hasFunctionalPrivileges(functionalPrivileges, { page, action })
  );

  return roleIndex > -1;
};

module.exports = hasPermission;
