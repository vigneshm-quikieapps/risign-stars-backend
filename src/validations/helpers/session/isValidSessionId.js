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
    return Promise.reject(`Please select a valid session`);
  }
};

module.exports = isValidSessionId;
