const logger = require("../../Config/logger.config");
const eventCategoryModel = require("../../Schema/events/eventCategory.model");
const httpErrors = require("http-errors");
const CategoryConstant = require("../../Constants/event.constants");
// Create new event category
const createEventCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - createEventCategoryController - Start"
    );
    const { name, description, icon } = req.body;

    const existingCategory = await eventCategoryModel.findOne({ name });
    if (existingCategory) {
      return next(
        httpErrors.BadRequest(CategoryConstant.EVENT_CATEGORY_ALREADY_EXISTS)
      );
    }

    const newCategory = new eventCategoryModel({
      name,
      description,
      icon,
    });

    const savedCategory = await newCategory.save();

    logger.info(
      "Controller - events - eventCategory - createEventCategoryController - End"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: savedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - createEventCategoryController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Get all event categories
const getAllEventCategoriesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - getAllEventCategoriesController - Start"
    );
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const categories = await eventCategoryModel
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await eventCategoryModel.countDocuments(query);
    logger.info(
      "Controller - events - eventCategory - getAllEventCategoriesController - Error"
    );
    res.status(200).json({
      success: true,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: categories,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - getAllEventCategoriesController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Get single event category by ID
const getEventCategoryByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - getEventCategoryByIdController - Start"
    );
    const category = await eventCategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Event category not found",
      });
    }
    logger.info(
      "Controller - events - eventCategory - getEventCategoryByIdController - End"
    );
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - getEventCategoryByIdController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Update event category
const updateEventCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - updateEventCategoryController - Start"
    );
    const { name, description, icon } = req.body;

    const updatedCategory = await eventCategoryModel.findByIdAndUpdate(
      req.params.id,
      { name, description, icon },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Event category not found",
      });
    }

    logger.info(
      "Controller - events - eventCategory - updateEventCategoryController - End"
    );
    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - createEventCategoryController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Delete event category
const deleteEventCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - deleteEventCategoryController - Start"
    );
    // Check if category is used in any events before deleting
    const eventCount = await Event.countDocuments({ category: req.params.id });

    if (eventCount > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete category with associated events",
      });
    }

    const deletedCategory = await eventCategoryModel.findByIdAndDelete(
      req.params.id
    );

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Event category not found",
      });
    }

    logger.info(
      "Controller - events - eventCategory - deleteEventCategoryController - End"
    );

    res.status(200).json({
      success: true,
      message: "Event category deleted successfully",
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - deleteEventCategoryController - error",
      error
    );

    next(httpErrors.InternalServerError(error));
  }
};

module.exports = {
  createEventCategoryController,
  getAllEventCategoriesController,
  getEventCategoryByIdController,
  updateEventCategoryController,
  deleteEventCategoryController,
};
