const { StatusCodes } = require("http-status-codes");
const UnauthorizedError = require("../../exceptions/UnauthorizedError");
const { verify } = require("jsonwebtoken");
const { hasPermission, hasAllPermission } = require("./utils");
const getRoleIds = require("./utils/getRoleIds");

/**
 * Note:
 * 1. checks if the user is is authorized to perform a task
 *
 * 2. to bypass the is authorized check.
 * open .env file.
 * set IS_AUTHORIZED_CHECK=DISABLE
 *
 *
 * @param {*} page
 * @param {*} action
 * @returns
 */
const isAuthorized = (page, action) => async (req, res, next) => {
  if (process.env.IS_AUTHORIZED_CHECK === "DISABLE") {
    next();
  } else {
    checkIsAuthorized(req, res, next, page, action);
  }
};

const checkIsAuthorized = async (req, res, next, page, action) => {
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
        throw new UnauthorizedError();
      }
    }

    /**
     * if the code execution reaches here.
     * that means, the user is authorized
     */

    next();
  } catch (err) {
    console.error(err.message);
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Unauthorized" });
  }
};

module.exports = isAuthorized;
