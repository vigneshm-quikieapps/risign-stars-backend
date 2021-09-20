const { verify } = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const IsAuthenticated = (req, res, next) => {
  try {
    let token =
      req.headers.Authorization && req.headers.Authorization.split(" ")[1];
    let decoded = verify(token, process.env.ACCESS_TOKEN);
    req.userData = decoded;
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Unauthorized" });
  }
};

module.exports = IsAuthenticated;
