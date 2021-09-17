const { StatusCodes } = require("http-status-codes");

/**
 * get roles from the authenticated user
 *
 * get pages from roles
 *
 * endpoints
 * create /page1
 * read   /page1
 * update /page1
 * delete /page1
 *
 * protect the endpoint
 *
 * if the user has the permission for a page with a particular method
 * then allow
 * else restrict
 *
 */

const isAuthorized = (req, res, next) => {
  try {
    /** check if authenticated */
    let token =
      req.headers.Authorization && req.headers.Authorization.split(" ")[1];
    let decoded = verify(token, process.env.ACCESS_TOKEN);
    req.userData = decoded;

    /** check if authorized */
    next();
  } catch (err) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send({ message: "Unauthorized" });
  }
};

module.exports = isAuthorized;
