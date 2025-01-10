const httpErrors = require("http-errors");
const { VerifyAccessToken } = require("../Utils/jwt.token");
const UserServiceClass = require("../Services/user.service");
const logger = require("../Config/logger.config");
const { USER_NOT_FOUND } = require("../Constants/user.constants");
const {
  AUTHENTICATION_TOKEN_REQUIRED,
  AUTHORIZATION_REQUIRED,
  MOSQUE_ACCESS_DENIED,
} = require("../Constants/auth.constants");
const {
  ADMIN,
  SUPPER_ADMIN,
  SUB_USER,
} = require("../Constants/roles.constants");
const mosqueModel = require("../Schema/mosque.model");
const { MOSQUE_NOT_FOUND } = require("../Constants/mosque.constants");

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
    req.__type__ = decode.__type__;
    logger.warn(`req Email : ${userExist.email} role:${userExist.role}`);
    next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userType = req.__type__;
    if (!roles.includes(userRole) && userType === "ROOT") {
      return next(httpErrors.Unauthorized(AUTHORIZATION_REQUIRED));
    }
    if (!roles.includes(userType) && userType === SUB_USER) {
      return next(httpErrors.Forbidden(MOSQUE_ACCESS_DENIED));
    }

    next();
  };
};

module.exports.CheckMosqueAccess = async (req, res, next) => {
  try {
    logger.info("CheckMosqueAccess - MiddleWare");
    // const userId = req.user._id;
    const __type__ = req.__type__ || null;
    const role = req.user?.role || null;
    const mosqueId = req.user?.mosque_admin || req.user?.mosqueId || null;

    if (__type__ === "ROOT" && role === SUPPER_ADMIN) {
      return next();
    }
    const mosqueExist = await mosqueModel.findById(mosqueId).lean();

    if (!mosqueExist) {
      return next(httpErrors.NotFound(MOSQUE_NOT_FOUND));
    }

    if (__type__ === "ROOT" && role === ADMIN) {
      req.mosqueId = mosqueExist._id;
      logger.warn(`req mosqueId : ${req.mosqueId}`);
      return next();
    }

    // console.log("testing");
    // next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
