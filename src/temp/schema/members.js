const { ADDRESS_TYPE, RELATIONSHIPS } = require("./constants");

/**
 * API's
 * 1. get a list of child/members
 * 2. CRUD a child
 * 3. add addresses and emergengy contact
 * 4. Provide Consent for a child
 */
module.exports.members = {
  id: String,
  userId: String /** PARENT ID */,
  membership: [
    {
      businessId: String,
      clubMembershipId: String,
    },
  ],
  name: String,
  dob: Date,
  contacts: [
    {
      type: ADDRESS_TYPE,
      name: String,
      contact: String,
      relationShip: RELATIONSHIPS,
    },
  ],
  updatedBy: [String] /** array of ids of who updated this record */,
  createdAt: Date,
  updatedAt: Date,
};
