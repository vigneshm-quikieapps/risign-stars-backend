const FUNCTIONAL_PRIVILEDGES = [
  "ACTIVITY_DEFINITION",
  "ACTIVITY_ENROLMENT",
  "ACTIVITY_ATTENDANCE",
];
const CRUD = ["create", "read", "update", "delete"];
const DATA_PRIVILEDGES_TYPE = ["ALL", "ONE"];
const STARTS_WITH_FILTER = "STARTS_WITH";
const EQUALS_FILTER = "EQUALS";
const FILTER_TYPES = [STARTS_WITH_FILTER, EQUALS_FILTER];
const EVALUATION_STATUS_ACTIVE = "active";
const EVALUATION_STATUS_INACTIVE = "inactive";
const EVALUATION_STATUS = [
  EVALUATION_STATUS_ACTIVE,
  EVALUATION_STATUS_INACTIVE,
];
const ADDRESS_TYPE = Array;
const RELATIONSHIPS = "relationship";
const ENUM_ENROLLED_STATUS = Boolean;
const  ENUM_DISCONTINUATION_REASON = String;
const ENUM_CLASSES_STATUS = Boolean;
const ENUM_PAY_FREQUENCY = String;

module.exports = {
  EVALUATION_STATUS_ACTIVE,
  EVALUATION_STATUS_INACTIVE,
  EVALUATION_STATUS,
  FUNCTIONAL_PRIVILEDGES,
  STARTS_WITH_FILTER,
  EQUALS_FILTER,
  FILTER_TYPES,
  DATA_PRIVILEDGES_TYPE,
  CRUD,
  ADDRESS_TYPE,
  RELATIONSHIPS,
  ENUM_DISCONTINUATION_REASON,
  ENUM_ENROLLED_STATUS,
  ENUM_CLASSES_STATUS,
  ENUM_PAY_FREQUENCY
};
