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
const userMosqueModel = require("../Schema/users/user_mosque.model");
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

    let userExist = null;

    if (decode.__type__ === SUPPER_ADMIN || decode.__type__ === ADMIN) {
      const UserServiceMethods = new UserServiceClass();
      userExist = await UserServiceMethods.getUserById(decode.id);
    } else if (decode.__type__ === SUB_USER) {
      userExist = await userMosqueModel.findById(decode.id).lean();
      userExist.role = SUB_USER;
    }
    if (!userExist) {
      return next(httpErrors.NotFound(USER_NOT_FOUND));
    }
    req.user = userExist;
    req.__type__ = decode.__type__;
    logger.warn(
      `req Email : ${userExist?.email || userExist?.name} role:${
        userExist.role
      }`
    );
    next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// authorization depending  upon a role
module.exports.Authorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.__type__;
    if (!roles.includes(userRole)) {
      return next(httpErrors.Unauthorized(AUTHORIZATION_REQUIRED));
    }
    next();
  };
};

module.exports.CheckMosqueAccess = async (req, res, next) => {
  try {
    logger.info("CheckMosqueAccess - MiddleWare");

    const role = req.__type__;
    const mosqueId = req.user?.mosque_admin || req.user?.mosqueId || null;

    const mosqueExist = await mosqueModel.findById(mosqueId).lean();

    if (!mosqueExist) {
      return next(httpErrors.NotFound(MOSQUE_NOT_FOUND));
    }

    if (role === SUPPER_ADMIN) {
      return next();
    } else if (
      role === ADMIN &&
      req.user.mosque_admin.toString() === mosqueExist._id.toString()
    ) {
      req.mosqueId = mosqueExist._id;
      logger.warn(`req mosqueId : ${req.mosqueId}`);
      return next();
    } else if (
      role === SUB_USER &&
      req.user.mosqueId.toString() === mosqueExist._id.toString()
    ) {
      req.mosqueId = mosqueExist._id;
      logger.warn(`req mosqueId : ${req.mosqueId}`);
      return next();
    } else {
      return next(httpErrors.Forbidden(MOSQUE_ACCESS_DENIED));
    }
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.CheckMosqueAuthorization = (...roles) => {
  return (req, res, next) => {
    const userRole = req.__type__;
    if (!roles.includes(userRole)) {
      return next(httpErrors.Forbidden(MOSQUE_ACCESS_DENIED));
    }

    next();
  };
};

module.exports.CheckMosquePermissions = (requiredPermission) => {
  return (req, res, next) => {
    const user = req.user;
    const role = req.__type__;

    if (role === SUB_USER && user?.permissions[requiredPermission] !== true) {
      // return res.status(403).json({ message: `Access denied. You do not have ${requiredPermission} permission.` });
      return next(httpErrors.Forbidden(MOSQUE_ACCESS_DENIED));
    }
    next();
  };
};
