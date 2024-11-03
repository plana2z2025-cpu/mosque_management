const httpErrors = require("http-errors");
const {
  RegisterUserValidation,
  LoginUserValidation,
} = require("../validators/user.joi");
const UserServiceClass = require("../Services/user.service");
const USER_CONSTANTS = require("../Constants/user.constants");
const logger = require("../Config/applogger.config");
const { VerifyPasswordMethod } = require("../Utils/verifypassword");
const { CreateAcessToken } = require("../Utils/jwt.token");

module.exports.LoginUserController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-LoginUserController-Start");
    const { error } = LoginUserValidation(req.body);
    if (error) return next(httpErrors.BadRequest(error.details[0].message));

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
    const token = await CreateAcessToken(userExist._id);

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

module.exports.RegisterController = async (req, res, next) => {
  try {
    logger.info("Controller-user.controller-RegisterController-Start");
    const { error } = RegisterUserValidation(req.body);
    if (error) return next(httpErrors.BadRequest(error.details[0].message));

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

module.exports.MyProfileController = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: req.user,
    });
  } catch (error) {
    logger.warn("Controller-user.controller-RegisterController-End", error);
    next(httpErrors.InternalServerError(error.message));
  }
};
