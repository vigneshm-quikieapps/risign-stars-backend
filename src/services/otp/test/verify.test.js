const InvalidOTPError = require("../../../exceptions/InvalidOTPError");
const otp = require("../index");

describe("OTP", () => {
  test("valid otp", () => {
    expect(() => {
      let validOTP = 123456;
      otp.verify(validOTP);
    }).toBeTruthy();
  });

  test("invalid otp", () => {
    let invalidOTP = "s12435";
    expect(() => {
      otp.verify(invalidOTP);
    }).toThrow(InvalidOTPError);
  });
});
