const { sign } = require("jsonwebtoken");

const createRefreshToken = (user) => {
  return sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = createRefreshToken;
