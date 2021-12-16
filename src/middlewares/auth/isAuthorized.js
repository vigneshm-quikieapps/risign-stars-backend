const { StatusCodes } = require("http-status-codes");
const UnauthorizedError = require("../../exceptions/UnauthorizedError");
const { verify } = require("jsonwebtoken");
const { hasPermission } = require("./utils");
const getRoleIds = require("./utils/getRoleIds");
const getRoles = require("./utils/getRoles");
const { User } = require("../../models");

/**
 * Note:
 * 1. checks if the user is is authorized to perform a task
 *
 * 2. to bypass the is authorized check.
 * open .env file.
 * set IS_AUTHORIZED_CHECK=DISABLE
 *
 * 3. isAuthHandler: custom handler function to authorized a user checker
 * Note: isAuthHandler should throw error is failed / not authorized
 *
 *
 *
 * isAuthorized(null, null) : if the user is authenticated, let it pass
 * isAuthorized(page, action,{getResourceBusinessId}) : if the user has permission, let it pass
 * isAuthorized(null, null, { isAuthHandler }): if the user passes the auth handler, let it pass
 * isAuthorized(page, action, { isAuthHandler }): if the user either has permission or the auth handler passes, let it pass
 *
 *
 * @param {*} page
 * @param {*} action
 * @returns
 */
const isAuthorized =
  (page, action, options = {}) =>
  async (req, res, next) => {
    let token = null;
    try {
      token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
      let tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.authUserData = await User.findById(tokenPayload._id);
      req.tokenData = tokenPayload;
    } catch (err) {
      return res.status(StatusCodes.UNAUTHORIZED).send({ message: err.message });
    }

    // if (isAuthHandler) {
    //   try {
    //     isAuthHandler(req, res);
    //     next();
    //   } catch (err) {
    //     return res.send({ message: err.message });
    //   }
    // } else {
    //   if (process.env.IS_AUTHORIZED_CHECK === "DISABLE") {
    //     next();
    //   } else {
    //     checkIsAuthorized(req, res, next, page, action);
    //   }
    // }

    switch (true) {
      case page == null && action == null && !options.isAuthHandler:
        //  &&
        // !options.isSuperAdminOnly:
        //it allows users who has valid access token
        next();
        break;

      case process.env.IS_AUTHORIZED_CHECK === "DISABLE":
        //it disables the authoraisation check
        next();
        break;
      // case options.isSuperAdminOnly:
      //   //it checks for the Super Admin Only
      //   try {
      //     //it allows access only for Super Admin
      //     if (!hasAllPermission(req.authUserData)) {
      //       throw new UnauthorizedError();
      //     }
      //     next();
      //   } catch (err) {
      //     console.error(err.message);
      //     return res
      //       .status(StatusCodes.UNAUTHORIZED)
      //       .send({ message: "Unauthorized" });
      //   }
      //   break;
      default:
        try {
          //it allows bussiness admin with required permission to the page
          await checkIsAuthorized(req, res, next, { page, action, options });
          next();
        } catch (err) {
          try {
            //it allows/restrict the access to a resource by a parent
            let { isAuthHandler } = options;

            if (!isAuthHandler) {
              throw err;
            }

            await isAuthHandler(req, res);
            next();
          } catch (err2) {
            console.error(err2.message);
            return res
              .status(StatusCodes.FORBIDDEN)
              .send({ message: "Unauthorized" });
          }
        }
        break;
    }
  };

const checkIsAuthorized = async (req, res, next, { page, action, options }) => {
  if (page === null || action === null) {
    throw new Error("page or action not defined");
  }

  let tokenPayload = req.authUserData;
  let businessId;
  if (options.getResourceBusinessId) {
    businessId = await options.getResourceBusinessId(req, res);
  }
  //console.log("bussinessId from getResourceBusinessId funcn:", businessId);
  /**
   * if data privileges type is "ALL": the user has full access to any api
   * else check if the user has permission for that particular api
   */
  // if (!hasAllPermission(tokenPayload)) {
  let roleIds = getRoleIds(tokenPayload);
  let roles = await getRoles(roleIds);
  if (!hasPermission(businessId, roles, { page, action }, tokenPayload)) {
    throw new UnauthorizedError();
  }
  // }

  /**
   * if the code execution reaches here.
   * that means, the user is authorized
   */
};

module.exports = isAuthorized;
