const findFunctionalPrivilegesIndex = require("./findFunctionalPrivileges");

const hasFunctionalPrivileges = (functionalPrivileges, { page, action }) => {
  return (
    findFunctionalPrivilegesIndex(functionalPrivileges, { page, action }) > -1
  );
};

module.exports = hasFunctionalPrivileges;
