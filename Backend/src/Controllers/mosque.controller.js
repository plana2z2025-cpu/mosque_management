const httpErrors = require("http-errors");
const UserServiceClass = require("../Services/user.service");
const MosqueServiceClass = require("../Services/mosque.service");
const MOSQUE_CONSTANTS = require("../Constants/mosque.constants");
const logger = require("../Config/applogger.config");
const { createNewMosqueValidation } = require("../validators/mosque.joi");
const { RegisterUserValidation } = require("../validators/user.joi");
const { USER_ALREADY_EXISTS } = require("../Constants/user.constants");
const moment = require("moment");
const CommonService = require("../Services/common.service");
const mosqueModel = require("../Schema/mosque.model");

module.exports.createNewMosqueController = async (req, res, next) => {
  try {
    logger.info("Controller-mosque.controller-createNewMosqueController-Start");
    const { error } = createNewMosqueValidation(req.body.mosqueDetails);
    if (error) return next(httpErrors.BadRequest(error.details[0].message));
    const { error: userError } = RegisterUserValidation(req.body.userDetails);
    if (userError)
      return next(httpErrors.BadRequest(userError.details[0].message));

    // user creation Logic
    const userServiceClass = new UserServiceClass();
    let userExist = await userServiceClass.getUserFindOne({
      email: req.body.email,
    });
    if (userExist) {
      return next(httpErrors.BadRequest(USER_ALREADY_EXISTS));
    }
    userExist = await userServiceClass.createUserDocument(req.body.userDetails);

    // mosque creation logic
    const mosqueServiceClass = new MosqueServiceClass();
    const newMosque = await mosqueServiceClass.createMosqueDocument({
      ...req.body.mosqueDetails,
      administrators: [userExist._id],
      createdOn: moment().unix(),
    });

    logger.info("Controller-mosque.controller-createNewMosqueController-End");
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: MOSQUE_CONSTANTS.SUCCESSFULLY_MOSQUE_CREATED,
      details: newMosque,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-createNewMosqueController-Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.getMosquesListController = async (req, res, next) => {
  try {
    logger.info("Controller-mosque.controller-getMosquesListController-Start");
    const { limit = 15, page = 1 } = req.query;
    const skip_docs = (page - 1) * limit;

    const totalDocs = await mosqueModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await mosqueModel
      .find()
      .skip(skip_docs)
      .limit(limit)
      .sort({ createdAt: -1 });

    const hasNext = totalDocs > skip_docs + limit;
    const hasPrev = page > 1;

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: page,
      hasNext,
      hasPrev,
    };

    logger.info("Controller-mosque.controller-getMosquesListController-End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-getMosquesListController-Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.getSingleMosqueDetailController = async (req, res, next) => {
  try {
    logger.info(
      "Controller-mosque.controller-getSingleMosqueDetailController-Start"
    );
    const { mosqueId } = req.params;
    const data = await mosqueModel.findById(mosqueId);

    if (!data) {
      return next(httpErrors.NotFound(MOSQUE_CONSTANTS.MOSQUE_NOT_FOUND));
    }

    logger.info(
      "Controller-mosque.controller-getSingleMosqueDetailController-End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-getSingleMosqueDetailController-Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};
