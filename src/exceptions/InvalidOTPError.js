class InvalidOTPError extends Error {
  constructor(message = "Invalid OTP") {
    super(message);
    this.name = "InvalidOTPError";
  }
}

module.exports = InvalidOTPError;
