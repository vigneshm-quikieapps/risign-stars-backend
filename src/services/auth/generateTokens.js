const AccessToken = require("./AccessToken");
const RefreshToken = require("./RefreshToken");
const createPayload = require("./createPayload");

module.exports = (data) => {
  let payload = createPayload(data);
  return {
    accessToken: AccessToken.create(payload),
    refreshToken: RefreshToken.create(payload),
  };
};
