module.exports = (payload) => {
  let { user } = payload;
  return {
    _id: user.id,
    roles: user.roles || [],
    dataPrivileges: user.dataPrivileges || {},
  };
};
