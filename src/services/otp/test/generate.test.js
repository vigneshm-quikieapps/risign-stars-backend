const otp = require("../index");

describe("OTP", () => {
  test("generate", () => {
    expect(otp.generate()).toHaveLength(otp.length);
    expect(parseInt(otp.generate())).toBeTruthy();
  });
});
