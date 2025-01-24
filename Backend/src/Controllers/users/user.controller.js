const httpErrors = require("http-errors");
const UserServiceClass = require("../../Services/user.service");
const USER_CONSTANTS = require("../../Constants/user.constants");
const SUB_USER_CONSTANTS = require("../../Constants/user_mosque.constant");
const logger = require("../../Config/logger.config");
const { VerifyPasswordMethod } = require("../../Utils/verify.password");
const { CreateAccessToken } = require("../../Utils/jwt.token");
const userModel = require("../../Schema/users/user.model");
const userMosqueModel = require("../../Schema/users/user_mosque.model");
const { SUB_USER } = require("../../Constants/roles.constants");

const LoginUserController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-LoginUserController-Start");
    const { password, email } = req.body;
    const userServiceClass = new UserServiceClass();
    userServiceClass.setField("+password");
    const userExist = await userServiceClass.getUserFindOne({
      email,
    });

    if (!userExist)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    const isPasswordMatch = await VerifyPasswordMethod(
      password,
      userExist.password
    );

    if (!isPasswordMatch)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    delete userExist.password;
    const token = await CreateAccessToken(userExist._id, "ROOT");

    res.status(200).send({
      success: true,
      statusCode: 200,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
      accessToken: token,
      data: userExist,
    });
  } catch (error) {
    logger.error("Controller-user.controller-LoginUserController-Error", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

const RegisterController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-RegisterController-Start");

    const userServiceClass = new UserServiceClass();
    const userExist = await userServiceClass.getUserFindOne({
      email: req.body.email,
    });

    if (userExist) {
      return next(httpErrors.BadRequest(USER_CONSTANTS.USER_ALREADY_EXISTS));
    }

    await userServiceClass.createUserDocument(req.body);
    logger.info("Controller-user.controller-RegisterController-End");
    res.status(201).send({
      success: true,
      statusCode: 201,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_CREATED,
    });
  } catch (error) {
    logger.error("Controller-user.controller-RegisterController-Error", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

const MyProfileController = async (req, res, next) => {
  try {
    let data = null;

    if (req.__type__ === "ROOT") {
      data = await userModel
        .findById(req.user._id)
        .populate("mosque_admin", "name");
    } else {
      data = await userMosqueModel.findById(req.user._id).lean();
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: data,
    });
  } catch (error) {
    logger.warn("Controller-user.controller-RegisterController-End", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

// SUB - USER LOGIN
const LoginSubUserController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-LoginSubUserController-Start");
    const { mosqueUniqueId, name, password } = req.body;
    const userExist = await userMosqueModel
      .findOne({ mosqueUniqueId, name })
      .select("+password")
      .lean();

    if (!userExist) {
      return next(httpErrors.NotFound(SUB_USER_CONSTANTS.SUB_USER_NOT_FOUND));
    }

    const isPasswordMatch = await VerifyPasswordMethod(
      password,
      userExist.password
    );

    if (!isPasswordMatch)
      return next(httpErrors.BadRequest(USER_CONSTANTS.INVALID_EMAIL_PASSWORD));

    delete userExist.password;
    const token = await CreateAccessToken(userExist._id, SUB_USER);
    res.status(200).send({
      success: true,
      statusCode: 200,
      message: USER_CONSTANTS.SUCCESSFULLY_USER_LOGIN,
      accessToken: token,
      data: userExist,
    });
  } catch (error) {
    logger.error(
      "Controller-user.controller-LoginSubUserController-Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports = {
  LoginUserController,
  RegisterController,
  MyProfileController,
  LoginSubUserController,
};
