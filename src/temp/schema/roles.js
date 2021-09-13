const { FUNCTIONAL_PRIVILEGES } = require("./constants");

/**
 * API's
 * 1. get a list of roles,
 * 2. get a role
 * 3. create a role
 * 4. update a role
 * 5. delete a role
 *
 * Note:
 * 3a. on creating a role, add the business name to dataPriviledges
 * 4a. on updating a role, update the relevant information in the roles section of users (collection)
 */
module.exports.roles = {
  id: String,
  name: String /** unique */,
  code: String /** unique */,
  description: String,
  functionalPriviledges: [
    {
      type: FUNCTIONAL_PRIVILEGES,
      permission: {
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean,
      },
    },
  ],
};
