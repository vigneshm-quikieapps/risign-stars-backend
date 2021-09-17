const Exception = require("./Exception");

class DoesNotExistException extends Exception {
  constructor(message = "Does not exist") {
    super(message);
    this.name = "DoesNotExistException";
  }
}

module.exports = DoesNotExistException;