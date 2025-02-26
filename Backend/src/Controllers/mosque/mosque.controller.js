const httpErrors = require("http-errors");
const UserServiceClass = require("../../Services/user.service");
const MosqueServiceClass = require("../../Services/mosque.service");
const mosqueModel = require("../../Schema/mosque/mosque.model");
const eventCategoryModel = require("../../Schema/events/eventCategory.model");
const ramadanTimingModel = require("../../Schema/ramadan/ramadan_timings.model");
const settingsModel = require("../../Schema/mosque/settings.model");
const logger = require("../../Config/logger.config");
const { USER_ALREADY_EXISTS } = require("../../Constants/user.constants");
const moment = require("moment");
const sortConstants = require("../../Constants/sort.constants");
const { ADMIN } = require("../../Constants/roles.constants");
const mosqueConstants = require("../../Constants/mosque.constants");
const {
  newRegistrationMosqueWebhook,
} = require("../../hooks/registration.webhook");
const errorHandling = require("../../Utils/errorHandling");

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

    const isSlugPresent = await mosqueModel.findOne({ slug });
    if (isSlugPresent) {
      return next(httpErrors.BadRequest(mosqueConstants.SLUG_NOT_PRESENT));
    }

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
      createdOn: moment().unix(),
    });

    userExist = await userServiceClass.createUserDocument({
      ...user,
      role: ADMIN,
      mosque_admin: newMosque._id,
    });

    let eventsData = [
      {
        name: "Eid ul-Fitr",
        description:
          "Marks the end of Ramadan fasting, celebrated with communal prayers, family gatherings, and sharing of food and gifts.",
      },
      {
        name: "Eid ul-Adha",
        description:
          "Commemorates Prophet Ibrahim's willingness to sacrifice his son, marked by prayers, sacrifice of animals, and distribution of meat to the needy.",
      },
      {
        name: "Shab-e-Barat",
        description:
          "Night of forgiveness and mercy in the month of Sha'ban, spent in prayer and seeking Allah's blessings.",
      },
      {
        name: "Laylat al-Qadr",
        description:
          "Night of Power during Ramadan when the Quran was first revealed, considered more blessed than thousand months.",
      },
      {
        name: "Shab-e-Meraj",
        description:
          "Commemorates Prophet Muhammad's miraculous night journey and ascension to heaven.",
      },
      {
        name: "Milad un-Nabi",
        description:
          "Celebration of Prophet Muhammad's birth, marked with recitations, lectures, and sharing of food.",
      },
    ];

    eventsData = eventsData.map((item) => ({
      ...item,
      mosqueId: newMosque._id,
      createdBy: userExist._id,
      updatedBy: userExist._id,
      createdRef: "user",
      updatedRef: "user",
      default: true,
    }));

    const settingsDetails = {
      ramadanTimingsVisible: false,
      queryFormVisible: false,
      currency: {
        abbreviation: "USD",
        currency: "US Dollar",
        code: "USD",
        symbol: "$",
      },
      mosqueId: newMosque._id,
      createdBy: userExist._id,
      updatedBy: userExist._id,
      createdRef: "user",
      updatedRef: "user",
    };

    await eventCategoryModel.insertMany(eventsData);
    await settingsModel.create(settingsDetails);
    await newRegistrationMosqueWebhook(newMosque);

    logger.info("Controller-mosque.controller-createNewMosqueController-End");
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: mosqueConstants.SUCCESSFULLY_MOSQUE_CREATED,
      details: newMosque,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-createNewMosqueController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
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
      isAvailable: userExist ? false : true,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-createMosqueEmailController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const createMosqueSlugValidateController = async (req, res, next) => {
  try {
    const { slug } = req.body;
    let isExist = await mosqueModel.findOne({ slug });
    res.status(200).json({
      success: true,
      statusCode: 200,
      isAvailable: isExist ? false : true,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-createMosqueSlugController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getMosquesListController = async (req, res, next) => {
  try {
    logger.info("Controller-mosque.controller-getMosquesListController-Start");
    let { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    const {
      name = null,
      city = null,
      state = null,
      country = null,
      postalCode = null,
      facilities = null,
      active = null,
    } = req.query;

    limit = Number(limit);
    page = Number(page);

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
      currentPage: page,
      hasNext,
      hasPrev,
      limit,
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
    errorHandling.handleCustomErrorService(error, next);
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
      return next(httpErrors.NotFound(mosqueConstants.MOSQUE_NOT_FOUND));
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
    errorHandling.handleCustomErrorService(error, next);
  }
};

// -----------------------------------------------------------------------------
// __TYPE__ : ROOT => ADMIN,MOSQUE-USERS
// -----------------------------------------------------------------------------
const getCommunityMosqueDetailsController = async (req, res, next) => {
  try {
    logger.info("Controller-mosque.controller-getCommunityMosqueDetails-Start");
    const data = {};
    const details = await mosqueModel.findById(req.mosqueId).lean();
    const settings = await settingsModel
      .findOne({ mosqueId: req.mosqueId })
      .lean();
    data.details = details;
    data.settings = settings;
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-getCommunityMosqueDetails-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const updateCommunityMosqueDetailsController = async (req, res, next) => {
  try {
    logger.info(
      "Controller-mosque.controller-updateCommunityMosqueDetailsController-Start"
    );

    const details = req.body;
    const isSlugPresent = await mosqueModel.findOne({ slug: req.body.slug });
    if (isSlugPresent) {
      return next(httpErrors.BadRequest(mosqueConstants.SLUG_NOT_PRESENT));
    }

    const updatedDetails = await mosqueModel
      .findByIdAndUpdate(req.mosqueId, details, { new: true })
      .lean();

    logger.info(
      "Controller-mosque.controller-updateCommunityMosqueDetailsController-Error"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      details: updatedDetails,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-updateCommunityMosqueDetailsController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const updateCommunityMosqueTimingsController = async (req, res, next) => {
  try {
    logger.info(
      "Controller-mosque.controller-updateCommunityMosqueTimingsController-Start"
    );

    let isMosqueExist = await mosqueModel.findById(req.mosqueId);
    if (!isMosqueExist) {
      return next(httpErrors.NotFound(mosqueConstants.MOSQUE_NOT_FOUND));
    }

    const updatedTimings = { ...req.body };

    Object.keys(updatedTimings).forEach((item) => {
      isMosqueExist.timings[item] = updatedTimings[item];
    });

    await isMosqueExist.save();
    logger.info(
      "Controller-mosque.controller-updateCommunityMosqueTimingsController-End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      details: isMosqueExist,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-updateCommunityMosqueTimingsController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// -----------------------------------------------------------------------------
// __TYPE__ : PUBLIC
// -----------------------------------------------------------------------------

const getPublicAllMosqueController = async (req, res, next) => {
  try {
    logger.info(
      "Controller-mosque.controller-getPublicAllMosqueController-Start"
    );
    let { limit = 15, page = 1, sort = "-createdAt" } = req.query;
    const {
      name = null,
      city = null,
      state = null,
      country = null,
      postalCode = null,
      facilities = null,
      active = null,
    } = req.query;

    limit = Number(limit);
    page = Number(page);

    const skip_docs = (page - 1) * limit;

    const totalDocs = await mosqueModel.countDocuments();
    const totalPages = Math.ceil(totalDocs / limit);

    const query = {};
    if (name) query.name = { $regex: name, $options: "i" };
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
      .sort(sortConstants[sort] || sortConstants["-createdAt"])
      .select("name slug timings address")
      .lean();

    const hasNext = totalDocs > skip_docs + limit;
    const hasPrev = page > 1;

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: page,
      hasNext,
      hasPrev,
      limit,
    };

    logger.info(
      "Controller-mosque.controller-getPublicAllMosqueController-End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-getPublicAllMosqueController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getPublicSingleMosqueController = async (req, res, next) => {
  try {
    const { slug } = req.params;
    let data = {};
    const mosqueDetails = await mosqueModel.findOne({ slug }).lean();
    if (!mosqueDetails) {
      return next(httpErrors.NotFound(mosqueConstants.MOSQUE_NOT_FOUND));
    }

    const ramadanTimings = await ramadanTimingModel.findOne({
      mosqueId: mosqueDetails?._id.toString(),
    });

    data.mosqueDetails = mosqueDetails;
    data.ramadanTimings = ramadanTimings;
    res.status(200).json({
      success: true,
      status: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-getPublicSingleMosqueController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getMosqueCitiesListController = async (req, res, next) => {
  try {
    logger.info(
      "Controller-mosque.controller-getMosqueCitiesListController-Error"
    );

    const aggregation = [
      {
        $group: {
          _id: "$address.country",
          states: { $addToSet: "$address.state" },
          cities: {
            $addToSet: {
              state: "$address.state",
              city: "$address.city",
            },
          },
        },
      },
      // {
      //   $unwind: "$states",
      // },
      // {
      //   $group: {
      //     _id: { country: "$_id", state: "$states" },
      //     cities: { $addToSet: "$address.city" },
      //   },
      // },
      // {
      //   $group: {
      //     _id: "$_id.country",
      //     states: {
      //       $push: {
      //         state: "$_id.state",
      //         cities: "$cities",
      //       },
      //     },
      //   },
      // },
      // {
      //   $project: {
      //     _id: 0,
      //     country: "$_id",
      //     states: 1,
      //   },
      // },
    ];
    const aggregation2 = [
      {
        $group: {
          _id: "$address.country",
          states: { $addToSet: "$address.state" },
          cities: { $addToSet: "$address.city" },
        },
      },
      {
        $project: {
          _id: 0,
          country: "$_id",
          states: 1,
          cities: 1,
        },
      },
    ];
    const data = await mosqueModel.aggregate(aggregation2);
    res.status(200).json({
      success: true,
      statusCode: true,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller-mosque.controller-getMosqueCitiesListController-Error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createNewMosqueController,
  getMosquesListController,
  getSingleMosqueDetailController,
  createMosqueEmailValidateController,
  createMosqueSlugValidateController,
  getCommunityMosqueDetailsController,
  updateCommunityMosqueDetailsController,
  updateCommunityMosqueTimingsController,
  getPublicAllMosqueController,
  getPublicSingleMosqueController,
  getMosqueCitiesListController,
};
