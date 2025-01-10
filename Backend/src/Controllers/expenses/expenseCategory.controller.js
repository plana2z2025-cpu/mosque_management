const logger = require("../../Config/logger.config");
const expenseCategoryModel = require("../../Schema/expenses/expenseCategory.model");
const httpErrors = require("http-errors");
const sortConstants = require("../../Constants/sort.constants");
const ExpenseConstant = require("../../Constants/expense.constants");

const createExpenseCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - expenseCategory - createExpenseCategoryController - Start"
    );

    const { name, description } = req.body;

    const existingCategory = await expenseCategoryModel.findOne({
      name,
      mosqueId: req.mosqueId,
    });
    if (existingCategory) {
      return next(
        httpErrors.BadRequest(ExpenseConstant.EXPENSE_CATEGORY_EXISTS)
      );
    }

    const newCategory = new expenseCategoryModel({
      name,
      description,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === "ROOT" ? "user" : "user_mosque",
    });

    const savedCategory = await newCategory.save();

    logger.info(
      "Controller - expenses - expenseCategory - createExpenseCategoryController - End"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: ExpenseConstant.EXPENSE_CATEGORY_CREATED,
      data: savedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - expenseCategory - createExpenseCategoryController - error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const getExpenseCategoryByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - expenseCategory - getExpenseCategoryByIdController - Start"
    );

    const { categoryId } = req.params;
    const category = await expenseCategoryModel
      .findOne({ _id: categoryId, mosqueId: req.mosqueId })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!category) {
      return next(
        httpErrors.NotFound(ExpenseConstant.EXPENSE_CATEGORY_NOT_FOUND)
      );
    }

    logger.info(
      "Controller - expenses - expenseCategory - getExpenseCategoryByIdController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: category,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - expenseCategory - getExpenseCategoryByIdController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

const getAllExpenseCategoriesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - expenseCategory - getAllExpenseCategoriesController - Start"
    );

    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip_docs = (page - 1) * limit;
    const totalDocs = await expenseCategoryModel.countDocuments({
      mosqueId: req.mosqueId,
    });
    const totalPages = Math.ceil(totalDocs / limit);

    const query = {
      mosqueId: req.mosqueId,
    };

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const docs = await expenseCategoryModel
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
      "Controller - expenses - expenseCategory - getAllExpenseCategoriesController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - expenseCategory - getAllExpenseCategoriesController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

const updateExpenseCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - expenseCategory - updateExpenseCategoryController - Start"
    );

    const { categoryId } = req.params;
    const details = { ...req.body };
    details.updatedBy = req.user._id;
    details.updatedRef = req.__type__ === "ROOT" ? "user" : "user_mosque";

    const updatedCategory = await expenseCategoryModel
      .findOneAndUpdate({ _id: categoryId, mosqueId: req.mosqueId }, details, {
        new: true,
      })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!updatedCategory) {
      return next(
        httpErrors.BadRequest(ExpenseConstant.EXPENSE_CATEGORY_EXISTS)
      );
    }

    logger.info(
      "Controller - expenses - expenseCategory - updateExpenseCategoryController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: updatedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - expenseCategory - updateExpenseCategoryController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

const deleteExpenseCategoryController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - expenseCategory - deleteExpenseCategoryController - Start"
    );

    const { categoryId } = req.params;

    const deletedCategory = await expenseCategoryModel.findOneAndDelete({
      _id: categoryId,
      mosqueId: req.mosqueId,
    });

    if (!deletedCategory) {
      return next(
        httpErrors.NotFound(ExpenseConstant.EXPENSE_CATEGORY_NOT_FOUND)
      );
    }

    logger.info(
      "Controller - expenses - expenseCategory - deleteExpenseCategoryController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: ExpenseConstant.EXPENSE_CATEGORY_DELETED,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - expenseCategory - deleteExpenseCategoryController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

const getAllExpenseCategoryNamesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - getAllExpenseCategoryNamesController - Start"
    );

    const categories = await expenseCategoryModel
      .find({ mosqueId: req.mosqueId })
      .select("name")
      .lean();

    logger.info(
      "Controller - expenses - getAllExpenseCategoryNamesController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: categories,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - getAllExpenseCategoryNamesController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

module.exports = {
  createExpenseCategoryController,
  getExpenseCategoryByIdController,
  getAllExpenseCategoriesController,
  updateExpenseCategoryController,
  deleteExpenseCategoryController,
  getAllExpenseCategoryNamesController,
};
