const findFunctionalPrivilegesIndex = (
  functionalPrivileges,
  { page, action }
) => {
  return functionalPrivileges.findIndex(
    ({ type, permission }) => type === page && permission[action]
  );
};

module.exports = findFunctionalPrivilegesIndex;
