const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const { ADMIN } = require("../../Constants/roles.constants");
const mosqueConstants = require("../../Constants/mosque.constants");
const errorHandling = require("../../Utils/errorHandling");
const settingsModel = require("../../Schema/mosque/settings.model");

const createSettingsController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - mosque - settings - createSettingsController - Start"
    );

    // const isExist = await settingsModel.findOne({
    //   mosqueId: req.body.mosqueId,
    // });
    // if (isExist) {
    //   return next(httpErrors.Conflict(mosqueConstants.SETTINGS_EXIST));
    // }

    const settings = new settingsModel({
      ...req.body,
      createdBy: req.user._id,
      createdRef: req.__type__ === ADMIN ? "user" : "user_mosque",
      updatedBy: req.user._id,
      updatedRef: req.__type__ === ADMIN ? "user" : "user_mosque",
    });

    const savedSettings = await settings.save();

    logger.info(
      "Controller - mosque - settings - createSettingsController - End"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: savedSettings,
    });
  } catch (error) {
    logger.error(
      "Controller - mosque - settings - createSettingsController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createSettingsController,
};
