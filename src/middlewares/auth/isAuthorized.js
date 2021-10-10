const { StatusCodes } = require("http-status-codes");
const UnauthorizedError = require("../../exceptions/UnauthorizedError");
const { verify } = require("jsonwebtoken");
const { hasPermission, hasAllPermission } = require("./utils");
const getRoleIds = require("./utils/getRoleIds");

const isAuthorized = (page, action) => async (req, res, next) => {
  try {
    /** check if authenticated */
    let token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];
    let tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userData = tokenPayload;

    /**
     * if data privileges type is "ALL": the user has full access to any api
     * else check if the user has permission for that particular api
     */
    if (!hasAllPermission(tokenPayload)) {
      let roleIds = getRoleIds(tokenPayload);
      let roles = await getRoleIds(roleIds);
      if (!hasPermission(roles, { page, action })) {
        console.log("no permission");
        throw new UnauthorizedError();
      }
    }

    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Unauthorized" });
  }
};

module.exports = isAuthorized;
