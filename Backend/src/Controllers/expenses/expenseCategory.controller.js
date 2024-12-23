const logger = require("../../Config/logger.config");
const expenseCategoryModel = require("../../Schema/expenses/expenseCategory.model");
const httpErrors = require("http-errors");
const CategoryConstant = require("../../Constants/event.constants");
const sortConstants = require("../../Constants/sort.constants");

const createExpenseCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - createEventCategoryController - Start"
    );
    const { name, description, icon } = req.body;

    const existingCategory = await eventCategoryModel.findOne({ name });
    if (existingCategory) {
      return next(
        httpErrors.BadRequest(CategoryConstant.EVENT_CATEGORY_NOT_FOUND)
      );
    }

    const newCategory = new eventCategoryModel({
      name,
      description,
      icon,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === "ROOT" ? "user" : "user_mosque",
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
    next(httpErrors.InternalServerError(error.message));
  }
};
