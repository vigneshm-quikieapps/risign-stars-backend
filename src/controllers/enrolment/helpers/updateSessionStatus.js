const { BusinessSession } = require("../../../models");

const sessionStatus = async (req, status, session) => {
  let sessionData = req.businessSessionData;
  const sessionStatus = await BusinessSession.findByIdAndUpdate(
    sessionData.id,
    {
      status: status,
    },
    { session }
  );

  return sessionStatus;
};

module.exports = sessionStatus;
