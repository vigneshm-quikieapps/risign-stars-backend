const findFunctionalPrivilegesIndex = (
  functionalPrivileges,
  { page, action }
) => {
  return functionalPrivileges.findIndex(({ type, permission }) => {
    return type === page && permission[action];
  });
};

module.exports = findFunctionalPrivilegesIndex;
