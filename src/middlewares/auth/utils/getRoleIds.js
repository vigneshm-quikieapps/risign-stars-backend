const { Types } = require("mongoose");

/**
 * get array of mongoose object ids
 * @param {*} roles
 * @returns
 */
const getRoleIds = (tokenPayload) => {
  let { roles } = tokenPayload;
  return roles.map((role) => Types.ObjectId(role.id));
};

module.exports = getRoleIds;
