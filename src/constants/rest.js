const CREATE = "create";
const READ = "read";
const UPDATE = "update";
const DELETE = "delete";
const CRUD = [CREATE, READ, UPDATE, DELETE];
const REST_API = {
  METHODS: {
    CREATE,
    READ,
    UPDATE,
    DELETE,
  },
};

module.exports = {
  CREATE,
  CRUD,
  DELETE,
  READ,
  REST_API,
  UPDATE,
};
