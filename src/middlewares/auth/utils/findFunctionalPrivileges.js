const findFunctionalPrivilegesIndex = (
  functionalPriviledges,
  { page, action }
) => {
  return functionalPriviledges.findIndex(
    ({ type, permission }) => type === page && permission[action]
  );
};

module.exports = findFunctionalPrivilegesIndex;
