const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");

const verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, rejected) => {
    jwt.verify(refreshToken, "REFRESHTOKEN", (err, payload) => {
      if (err) return rejected(createHttpError.Unauthorized);

      const userId = payload.aud;

      resolve(userId);
    });
  });
};

module.exports = verifyRefreshToken;
