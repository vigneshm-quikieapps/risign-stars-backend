const { ADDRESS_TYPE, RELATIONSHIPS } = require("./constants");

/**
 * API's
 * 1. get a list of child
 * 2. CRUD a child
 * 3. add addresses and emergengy contact
 * 4. Provide Consent for a child
 */
module.exports.members = {
  id: String,
  platformId:
    String /** should be a auto increment unique numeric serial ids */,
  userId: String,
  membership: [
    {
      businessId: String,
      clubMembershipId: String,
    },
  ],
  firstName: String,
  lastName: String,
  dob: Date,
  contacts: [
    {
      type: ADDRESS_TYPE,
      firstName: String,
      lastName: String,
      contact: String,
      relationShip: RELATIONSHIPS,
    },
  ],
  createdAt: Date,
  updatedAt: Date,
};
