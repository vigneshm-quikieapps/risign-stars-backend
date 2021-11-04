class InvalidTokenError extends Error {
  constructor(message = "Invalid Token") {
    super(message);
    this.name = "InvalidTokenError";
  }
}

module.exports = InvalidTokenError;
