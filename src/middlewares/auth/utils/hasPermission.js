const hasPermission = (roles, { page, action }) => {
    let roleIndex = roles.findIndex(({ functionalPriviledges }) =>
      hasFunctionalPrivileges(functionalPriviledges, { page, action })
    );
    return roleIndex > -1;
  };

  module.exports = hasPermission