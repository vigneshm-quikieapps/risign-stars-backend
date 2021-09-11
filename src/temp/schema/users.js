<<<<<<< HEAD
const { ENUM_USER_TYPES, ENUM_DATA_PRIVILEDGES_TYPE } = require("./constants");
=======
const FUNCTIONAL_PRIVILEDGES = [
  "ACTIVITY_DEFINITION",
  "ACTIVITY_ENROLMENT",
  "ACTIVITY_ATTENDANCE",
  "PROGRESS_RECORD",
];

const ADDRESS_TYPE = ["PRIMARY", "SECONDARY"];

const RELATIONSHIPS = [
  "FATHER",
  "MOTHER",
  "SON",
  "DAUGHTER",
  "HUSBAND",
  "WIFE",
  "BROTHER",
  "SISTER",
  "UNCLE",
  "AUNT",
  "NEPHEW",
  "NIECE",
  "COUSIN",
];

const DATA_PRIVILEDGES_TYPE = ["ALL", "ONE"];
>>>>>>> origin/development

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
<<<<<<< HEAD
  platformId: String,
=======
>>>>>>> origin/development
  firstName: String,
  lastName: String,
  email: String,
  contact: String,
  address: String,
  password: String,
<<<<<<< HEAD
  user_types: ENUM_USER_TYPES,
=======
>>>>>>> origin/development
  roles: [
    /** name of roles */
    {
      id: String,
      name: String,
      businessId: String /** optional */,
      businessName: String /** optional */,
    },
  ],
<<<<<<< HEAD
  emailVerified: Boolean /** default false */,
  phone: Boolean /** default false */,
  dataPriviledges: {
    type: ENUM_DATA_PRIVILEDGES_TYPE,
    businessId: String,
    businessName: String,
  },
  createdAt: Date,
  updateAt: Date,
=======
  createdAt: Date,
  updateAt: Date,
};

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
  name: String,
  description: String,
  functionalPriviledges: [
    {
      type: FUNCTIONAL_PRIVILEDGES,
      permission: {
        create: Boolean,
        read: Boolean,
        update: Boolean,
        delete: Boolean,
      },
    },
  ],
  dataPriviledges: {
    type: DATA_PRIVILEDGES_TYPE,
    businessId: String,
    businessName: String,
  },
};

/**
 * API's
 * 1. get a list of child
 * 2. CRUD a child
 * 3. Provide Consent for a child
 */
module.exports.students = {
  id: String,
  userId: String,
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
  consent: {
    allergies: String,
    condition: String,
    photographConsent: Boolean,
    signedByParent: Boolean,
    signedAt: Date,
  },
  newsletter: {
    email: Boolean,
    telephone: Boolean,
    sms: Boolean,
  },
  createdAt: Date,
  updatedAt: Date,
>>>>>>> origin/development
};
