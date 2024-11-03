const httpErrors = require("http-errors");
const { VerifyAccessToken } = require("../Utils/jwt.token");
const UserServiceClass = require("../Services/user.service");
const logger = require("../Config/applogger.config");
const { USER_NOT_FOUND } = require("../Constants/user.constants");
const {
  AUTHENTICATION_TOKEN_REQUIRED,
  AUTHORIZATION_REQUIRED,
} = require("../Constants/auth.constants");

// for authentication
module.exports.Authentication = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(httpErrors.Unauthorized(AUTHENTICATION_TOKEN_REQUIRED));
    }

    const token = authHeader.split(" ")[1];

    const decode = await VerifyAccessToken(token);

    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    const UserServiceMethods = new UserServiceClass();
    let userExist = await UserServiceMethods.getUserById(decode.id);

    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    req.user = userExist;
    logger.warn(`req Email : ${userExist.email} role:${userExist.role}`);
    next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(httpErrors.Unauthorized(AUTHORIZATION_REQUIRED));
    }
    next();
  };
};
