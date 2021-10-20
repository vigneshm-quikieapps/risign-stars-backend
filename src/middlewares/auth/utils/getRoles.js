const Role = require("../../../models/Role");

/**
 * get roles from the verified and decoded token
 *
 * @param {*} decoded
 * @returns
 */
const getRoles = async (roleIds = []) => {
  return Role.find({ _id: { $in: roleIds } });
};

module.exports = getRoles;
