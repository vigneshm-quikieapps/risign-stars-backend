const hasFunctionalPrivileges = (functionalPriviledges, { page, action }) => {
  return (
    findFunctionalPrivilegesIndex(functionalPriviledges, { page, action }) > -1
  );
};

module.exports = hasFunctionalPrivileges;
