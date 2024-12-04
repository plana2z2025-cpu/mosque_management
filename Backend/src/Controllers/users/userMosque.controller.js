const httpErrors = require("http-errors");
const userMosqueModel = require("../../Schema/users/user_mosque.model");
const mosqueModel = require("../../Schema/mosque.model");
const USER_CONSTANTS = require("../../Constants/user.constants");
const logger = require("../../Config/logger.config");
const { VerifyPasswordMethod } = require("../../Utils/verify.password");
const { CreateAccessToken } = require("../../Utils/jwt.token");
const sortConstants = require("../../Constants/sort.constants");

const createSubUserController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - users - UserMosqueController - createSubUserController - Start"
    );
    const { name, password } = req.body;
    const isUserExist = await userMosqueModel.findOne({ name });

    if (isUserExist) {
      return next(
        httpErrors.BadRequest("A user with this name already exists")
      );
    }

    const mosqueDetails = await mosqueModel.findById(req.mosqueId).lean();

    const details = new userMosqueModel({
      name,
      password,
      mosqueId: req.mosqueId,
      mosqueUniqueId: mosqueDetails.uniqueId,
      rootUserId: req.user._id,
      createdBy: req.user._id,
    });

    await details.save();

    logger.info(
      "Controller - users - UserMosqueController - createSubUserController - End"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "new sub-user is created successfully",
    });
  } catch (error) {
    logger.error(
      "Controller - users - UserMosqueController - createSubUserController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const getAllSubUsersController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - users - UserMosqueController - getAllSubUsersController - Start"
    );

    const docs = await userMosqueModel
      .find({ mosqueId: req.mosqueId })
      .sort(sortConstants["-createdAt"]);
    logger.info(
      "Controller - users - UserMosqueController - getAllSubUsersController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: docs,
    });
  } catch (error) {
    logger.error(
      "Controller - users - UserMosqueController - getAllSubUsersController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const getSubUserByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - users - UserMosqueController - getSubUsersByIdController - Start"
    );

    const { subUserId } = req.params;
    const userExist = await userMosqueModel.findById(subUserId);

    if (!userExist) return next(httpErrors.NotFound("sub user not found"));

    logger.info(
      "Controller - users - UserMosqueController - getSubUsersByIdController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: userExist,
    });
  } catch (error) {
    logger.error(
      "Controller - users - UserMosqueController - getSubUsersByIdController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const deleteSubUserByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - users - UserMosqueController - getSubUsersByIdController - Start"
    );

    const { subUserId } = req.params;
    const userExist = await userMosqueModel.findByIdAndDelete(subUserId);

    if (!userExist) return next(httpErrors.NotFound("sub user not found"));

    logger.info(
      "Controller - users - UserMosqueController - getSubUsersByIdController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully deleted the subuser",
    });
  } catch (error) {
    logger.error(
      "Controller - users - UserMosqueController - getSubUsersByIdController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports = {
  createSubUserController,
  getAllSubUsersController,
  getSubUserByIdController,
  deleteSubUserByIdController,
};
