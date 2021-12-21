module.exports = (payload) => {
  let { user } = payload;
  return {
    _id: user.id,
    dataPrivileges: user.dataPrivileges || {},
  };
};
