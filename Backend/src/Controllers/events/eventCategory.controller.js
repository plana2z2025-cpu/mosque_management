const logger = require("../../Config/logger.config");
const eventCategoryModel = require("../../Schema/events/eventCategory.model");
const httpErrors = require("http-errors");
const CategoryConstant = require("../../Constants/event.constants");
const sortConstants = require("../../Constants/sort.constants");
const errorHandling = require("../../Utils/errorHandling");
const { ADMIN } = require("../../Constants/roles.constants");

// Create new event category
const createEventCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - createEventCategoryController - Start"
    );
    const { name, description, icon } = req.body;

    const existingCategory = await eventCategoryModel.findOne({
      name,
      mosqueId: req.mosqueId,
    });
    if (existingCategory) {
      return next(
        httpErrors.BadRequest(CategoryConstant.EVENT_CATEGORY_ALREADY_EXISTS)
      );
    }

    const newCategory = new eventCategoryModel({
      name,
      description,
      icon,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === ADMIN ? "user" : "user_mosque",
      updatedBy: req.user._id,
      updatedRef: req.__type__ === ADMIN ? "user" : "user_mosque",
    });

    const savedCategory = await newCategory.save();

    logger.info(
      "Controller - events - eventCategory - createEventCategoryController - End"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "successfully created a new event category",
      data: savedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - createEventCategoryController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// Get single event category by ID
const getEventCategoryByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - getEventCategoryByIdController - Start"
    );
    const { categoryId } = req.params;
    const category = await eventCategoryModel
      .findOne({ _id: categoryId, mosqueId: req.mosqueId })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!category) {
      return next(
        httpErrors.NotFound(CategoryConstant.EVENT_CATEGORY_NOT_FOUND)
      );
    }
    logger.info(
      "Controller - events - eventCategory - getEventCategoryByIdController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - getEventCategoryByIdController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// Get all event categories
const getAllEventCategoriesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - getAllEventCategoriesController - Start"
    );
    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip_docs = (page - 1) * limit;
    const totalDocs = await eventCategoryModel.countDocuments({
      mosqueId: req.mosqueId,
    });
    const totalPages = Math.ceil(totalDocs / limit);

    const query = {
      mosqueId: req.mosqueId,
    };
    console.log("query", query);

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const docs = await eventCategoryModel
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
      .sort(sortConstants["-createdAt"]);

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
      "Controller - events - eventCategory - getAllEventCategoriesController - Error"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - getAllEventCategoriesController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// Update event category
const updateEventCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - updateEventCategoryController - Start"
    );
    const { categoryId } = req.params;
    const details = { ...req.body };
    details.updatedBy = req.user._id;
    details.updatedRef = req.__type__ === ADMIN ? "user" : "user_mosque";

    const updatedCategory = await eventCategoryModel
      .findOneAndUpdate({ _id: categoryId, mosqueId: req.mosqueId }, details, {
        new: true,
      })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!updatedCategory) {
      return next(
        httpErrors.BadRequest(CategoryConstant.EVENT_CATEGORY_ALREADY_EXISTS)
      );
    }

    logger.info(
      "Controller - events - eventCategory - updateEventCategoryController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: updatedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - createEventCategoryController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

// Delete event category
const deleteEventCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - deleteEventCategoryController - Start"
    );
    const { categoryId } = req.params;

    const deletedCategory = await eventCategoryModel.findOneAndDelete({
      _id: categoryId,
      mosqueId: req.mosqueId,
    });

    if (!deletedCategory) {
      return next(
        httpErrors.NotFound(CategoryConstant.EVENT_CATEGORY_NOT_FOUND)
      );
    }

    logger.info(
      "Controller - events - eventCategory - deleteEventCategoryController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: true,
      message: "Event category deleted successfully",
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - deleteEventCategoryController - error",
      error
    );

    errorHandling.handleCustomErrorService(error, next);
  }
};

// all category names
const getAllEventsCategoryNamesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - getAllEventsCategoryNamesController - Start"
    );
    const categories = await eventCategoryModel
      .find({ mosqueId: req.mosqueId })
      .select("name")
      .lean();
    logger.info(
      "Controller - events - getAllEventsCategoryNamesController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: true,
      data: categories,
    });
  } catch (error) {
    logger.error(
      "Controller - events - getAllEventsCategoryNamesController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createEventCategoryController,
  getAllEventCategoriesController,
  getEventCategoryByIdController,
  updateEventCategoryController,
  deleteEventCategoryController,
  getAllEventsCategoryNamesController,
};
