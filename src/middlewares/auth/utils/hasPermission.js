const hasFunctionalPrivileges = require("./hasFunctionalPrivileges");
const hasAccessToBusiness=(businessId,tokenPayload)=>{
  let { dataPrivileges } = tokenPayload;
  if (!dataPrivileges) {
    return false;
  }
  if(dataPrivileges.all) return true

  return dataPrivileges.list.includes(businessId);
 
}

const hasPermission = (businessId, roles, { page, action }, tokenPayload) => {
  //restricts bussiness admin from accessing other bussiness class
  // const hasAccessToBusiness = tokenPayload.dataPrivileges.find((bussiness) => {
  //   //console.log("nor here", bussiness.businessId.toString());

  //   if (bussiness.businessId.toString() === businessId) {
  //     return true;
  //   }
  // });
  if (!hasAccessToBusiness(businessId,tokenPayload)) return false;

  //checks whether the user has the functional previlages / permission
  let roleIndex = roles.findIndex(({ functionalPrivileges }) =>
    hasFunctionalPrivileges(functionalPrivileges, { page, action })
  );

  return roleIndex > -1;
};

module.exports = hasPermission;

