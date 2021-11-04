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
const TERM_STATUS_ACTIVE = "active";
const TERM_STATUS_INACTIVE = "inactive";
const TERM_STATUS = [
  TERM_STATUS_ACTIVE,
  TERM_STATUS_INACTIVE,
];

module.exports = {
  EVALUATION_STATUS_ACTIVE,
  EVALUATION_STATUS_INACTIVE,
  EVALUATION_STATUS,
  FUNCTIONAL_PRIVILEDGES,
  STARTS_WITH_FILTER,
  EQUALS_FILTER,
  FILTER_TYPES,
  DATA_PRIVILEDGES_TYPE,
  CRUD,TERM_STATUS
};
