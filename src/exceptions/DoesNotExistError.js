class DoesNotExistError extends Error {
  constructor(message = "Does not exist") {
    super(message);
    this.name = "DoesNotExistError";
  }
}

module.exports = DoesNotExistError;
