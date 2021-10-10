const CREATE = "CREATE";
const READ = "READ";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
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
