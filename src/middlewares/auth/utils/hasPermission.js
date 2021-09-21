const hasFunctionalPrivileges = require("./hasFunctionalPrivileges");

const hasPermission = (roles, { page, action }) => {
  let roleIndex = roles.findIndex(({ functionalPrivileges }) =>
    hasFunctionalPrivileges(functionalPrivileges, { page, action })
  );
  return roleIndex > -1;
};

module.exports = hasPermission;
