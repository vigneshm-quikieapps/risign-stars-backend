const { BusinessSession } = require("../../../models");

const isValidSessionId = async (sessionId, { req }) => {
  try {
    if (!sessionId) {
      throw new Error();
    }

    let session = await BusinessSession.findById(sessionId);
    if (!session) {
      throw new Error();
    }

    req.sessionData = session;

    return true;
  } catch (err) {
    return Promise.reject(`should be a valid session id`);
  }
};

module.exports = isValidSessionId;
