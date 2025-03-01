const httpErrors = require("http-errors");
const logger = require("../../Config/logger.config");
const { ADMIN } = require("../../Constants/roles.constants");
const errorHandling = require("../../Utils/errorHandling");
const fridayCollectionModel = require("../../Schema/mosque/fridaycollection.model");
const moment = require("moment");

const createFridayCollectionController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - mosque - fridayCollection - createFridayCollectionController - Start"
    );

    const { date } = req.body;

    const isDateIsFriday = moment(date, moment.ISO_8601).day() === 5;
    const todaysDate = moment().day();
    if (!isDateIsFriday || todaysDate !== 5) {
      throw httpErrors(400, "The provided or todays date is not a Friday.");
    }

    const fridayCollection = new fridayCollectionModel({
      ...req.body,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === ADMIN ? "user" : "user_mosque",
      updatedBy: req.user._id,
      updatedRef: req.__type__ === ADMIN ? "user" : "user_mosque",
    });

    const savedFridayCollection = await fridayCollection.save();

    logger.info(
      "Controller - mosque - fridayCollection - createFridayCollectionController - End"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: savedFridayCollection,
    });
  } catch (error) {
    logger.error(
      "Controller - mosque - fridayCollection - createFridayCollectionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getFridayCollectionController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - mosque - fridayCollection - getFridayCollectionController - Start"
    );

    let {
      startAmount,
      endAmount,
      startDate,
      endDate,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (startAmount && endAmount) {
      query.amount = {
        $gte: startAmount,
        $lte: endAmount,
      };
    } else if (startAmount) {
      query.amount = { $gte: startAmount };
    } else if (endAmount) {
      query.amount = { $lte: endAmount };
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      query.date = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.date = { $lte: new Date(endDate) };
    }

    const skip_docs = (page - 1) * limit;
    const totalDocs = await fridayCollectionModel.countDocuments({
      mosqueId: req.mosqueId,
    });
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await fridayCollectionModel
      .find({
        mosqueId: req.mosqueId,
      })
      .limit(limit * 1)
      .skip(skip_docs)
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

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
      "Controller - mosque - fridayCollection - getFridayCollectionController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - mosque - fridayCollection - getFridayCollectionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getSingleFridayCollectionController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - mosque - fridayCollection - getSingleFridayCollectionController - Start"
    );

    const { collectionId } = req.params;
    const mosqueId = req.mosqueId;
    console.log(collectionId);

    const data = await fridayCollectionModel
      .findOne({ mosqueId, _id: collectionId })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!data) {
      throw httpErrors(404, "Friday collection not found.");
    }

    logger.info(
      "Controller - mosque - fridayCollection - getSingleFridayCollectionController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - mosque - fridayCollection - getSingleFridayCollectionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const updateFridayCollectionController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - mosque - fridayCollection - updateFridayCollectionController - Start"
    );

    const { collectionId } = req.params;
    const mosqueId = req.mosqueId;
    const { online_amount = null, offline_amount = null } = req.body;

    const updatedDetails = {
      updatedBy: req.user._id,
      updatedRef: req.__type__ === ADMIN ? "user" : "user_mosque",
    };

    if (online_amount) {
      updatedDetails.online_amount = online_amount;
    }

    if (offline_amount) {
      updatedDetails.offline_amount = offline_amount;
    }

    const data = await fridayCollectionModel.findOneAndUpdate(
      { mosqueId, _id: collectionId },
      updatedDetails,
      { new: true }
    );
    if (!data) {
      throw httpErrors(404, "Friday collection not found.");
    }

    logger.info(
      "Controller - mosque - fridayCollection - updateFridayCollectionController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - mosque - fridayCollection - updateFridayCollectionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const deleteFridayCollectionController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - mosque - fridayCollection - deleteFridayCollectionController - Start"
    );

    const { collectionId } = req.params;
    const mosqueId = req.mosqueId;

    const data = await fridayCollectionModel.findOneAndDelete({
      mosqueId,
      _id: collectionId,
    });

    if (!data) {
      throw httpErrors(404, "Friday collection not found.");
    }

    logger.info(
      "Controller - mosque - fridayCollection - deleteFridayCollectionController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Friday collection deleted successfully.",
    });
  } catch (error) {
    logger.error(
      "Controller - mosque - fridayCollection - deleteFridayCollectionController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createFridayCollectionController,
  getFridayCollectionController,
  getSingleFridayCollectionController,
  updateFridayCollectionController,
  deleteFridayCollectionController,
};
