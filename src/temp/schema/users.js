const { ENUM_USER_TYPES, ENUM_DATA_PRIVILEDGES_TYPE } = require("./constants");

/**
 * API's
 * 1. get a list of users
 * 2. get a user detail
 * 3. update a user
 * 4. delete a user
 * 5. get a list of businesses of a user (in case of business admin)
 * 6. get a list of coach for a business
 * 7. add role to a user
 * 9. remove a role from a user
 *
 * Notes:
 * 1. On updating the roles of user.
 * Make sure to update the businesses array based on the roles of the user.
 *
 * 5a. filter the roles array with the condition: name === "BUSINESS ADMIN", get an array of unique { businessId, businessName }
 * 6a. filter the roles array with the condition: name === "COACH", get an array of unique { businessId, businessName }
 *
 */
module.exports.users = {
  id: String,
  name: String,
  email: String,
  contact: String,
  // address: String,
  status: ["ACTIVE", "INACTIVE"],
  password: String,
  user_types: ENUM_USER_TYPES,
  roles: [
    /** name of roles */
    {
      id: String,
      name: String,
    },
  ],
  emailVerified: Boolean /** default false */,
  phoneVerified: Boolean /** default false */,
  dataPriviledges: {
    type: ENUM_DATA_PRIVILEDGES_TYPE,
    businessId: String,
    businessName: String,
  },
  createdAt: Date,
  updateAt: Date,
};
