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
  userId:
    String /** In terms of business: PARENT ID,  terms of database: id in User model/collection */,
  membership: [
    {
      businessId: String,
      clubMembershipId: String,
    },
  ],
  name: String,
  dob: Date,
  gender: String /**["MALE", "FEMALE"]**/,
  consent: {
    allergies: String,
    condition: String,
    photographConsent: Boolean,
    signedByParent: Boolean,
    signedAt: Date,
  },
  contacts: [
    {
      type: ADDRESS_TYPE,
      name: String,
      contact: String,
      relationShip: RELATIONSHIPS,
    },
  ],
  createdAt: Date,
  createdBy: String /** userId */,
  lastUpdatedAt: Date,
  lastUpdatedBy: String /** userId */,
};
