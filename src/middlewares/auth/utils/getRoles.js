/**
 * get roles from the verified and decoded token
 *
 * @param {*} decoded
 * @returns
 */
const getRoles = async (roleIds = []) => {
  return await Role.find({ _id: { $in: roleIds } });
};

module.exports = getRoles;
