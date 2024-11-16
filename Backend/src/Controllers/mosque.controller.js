const httpErrors = require("http-errors");
const UserServiceClass = require("../Services/user.service");
const MosqueServiceClass = require("../Services/mosque.service");
const MOSQUE_CONSTANTS = require("../Constants/mosque.constants");
const logger = require("../Config/logger.config");
const { USER_ALREADY_EXISTS } = require("../Constants/user.constants");
const moment = require("moment");
const CommonService = require("../Services/common.service");
const mosqueModel = require("../Schema/mosque.model");
const sortConstants = require("../Constants/sort.constants");
const { MEMBER } = require("../Constants/roles.constants");

const createNewMosqueController = async (req, res, next) => {
  try {
    logger.info("Controller-mosque.controller-createNewMosqueController-Start");
    const {
      name,
      slug,
      address,
      contactInfo,
      aboutInfo,
      facilities,
      timings,
      user,
    } = req.body;

    const userServiceClass = new UserServiceClass();
    let userExist = await userServiceClass.getUserFindOne({
      email: user.email,
    });
    if (userExist) {
      return next(httpErrors.BadRequest(USER_ALREADY_EXISTS));
    }
    userExist = await userServiceClass.createUserDocument({
      ...user,
      role: MEMBER,
    });

    // mosque creation logic
    const mosqueServiceClass = new MosqueServiceClass();
    const newMosque = await mosqueServiceClass.createMosqueDocument({
      name,
      slug,
      address,
      contactInfo,
      aboutInfo,
      facilities,
      timings,
      administrators: [{ user: userExist._id, isOwner: true }],
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

const createMosqueEmailValidateController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const userServiceClass = new UserServiceClass();
    let userExist = await userServiceClass.getUserFindOne({ email });
    res.status(200).json({
      success: true,
      statusCode: 200,
      isAvailable: userExist ? true : false,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-createMosqueEmailController-Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const createMosqueSlugValidateController = async (req, res, next) => {
  try {
    const { slug } = req.body;
    let isExist = await mosqueModel.findOne({ slug });
    res.status(200).json({
      success: true,
      statusCode: 200,
      isAvailable: isExist ? true : false,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-createMosqueSlugController-Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const getMosquesListController = async (req, res, next) => {
  try {
    logger.info("Controller-mosque.controller-getMosquesListController-Start");
    const { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    const {
      name = null,
      city = null,
      state = null,
      country = null,
      postalCode = null,
      facilities = null,
      active = null,
    } = req.query;

    const skip_docs = (page - 1) * limit;

    const totalDocs = await mosqueModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    const query = {};
    if (name) query.name = name;
    if (city) query["address.city"] = city;
    if (state) query["address.state"] = state;
    if (country) query["address.country"] = country;
    if (postalCode) query["address.postalCode"] = postalCode;
    if (facilities) query.facilities = facilities;
    if (active) query.active = active;

    const docs = await mosqueModel
      .find(query)
      .skip(skip_docs)
      .limit(limit)
      .sort(sortConstants[sort] || sortConstants["-createdAt"]);

    const hasNext = totalDocs > skip_docs + limit;
    const hasPrev = page > 1;

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: Number(page),
      hasNext,
      hasPrev,
      limit: Number(limit),
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

const getSingleMosqueDetailController = async (req, res, next) => {
  try {
    logger.info(
      "Controller-mosque.controller-getSingleMosqueDetailController-Start"
    );
    const { slug } = req.params;
    const data = await mosqueModel.findOne({ slug });

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

module.exports = {
  createNewMosqueController,
  getMosquesListController,
  getSingleMosqueDetailController,
  createMosqueEmailValidateController,
  createMosqueSlugValidateController,
};
