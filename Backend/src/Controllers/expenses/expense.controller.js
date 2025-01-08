const expenseModel = require("../../Schema/expenses/expense.model");
const expenseCategoryModel = require("../../Schema/expenses/expenseCategory.model");
const payeeModel = require("../../Schema/expenses/payee.model");
const logger = require("../../Config/logger.config");
const httpErrors = require("http-errors");
const expenseConstant = require("../../Constants/expense.constants");
// const moment = require("moment");
const sortConstants = require("../../Constants/sort.constants");
const payeeConstant = require("../../Constants/payee.constants");

const createExpenseController = async (req, res, next) => {
  try {
    logger.info("Controller - expenses - createExpenseController - Start");
    const { category } = req.body;

    const isCategoryExist = await expenseCategoryModel
      .findById(category)
      .lean();
    if (!isCategoryExist) {
      return next(
        httpErrors.NotFound(expenseConstant.EXPENSE_CATEGORY_NOT_FOUND)
      );
    }

    if (req.body.payeeId) {
      const isPayeeExist = await payeeModel.findById(req.body.payeeId).lean();
      if (!isPayeeExist) {
        return next(httpErrors.NotFound(payeeConstant.PAYEE_NOT_FOUND));
      }
    }

    const expense = new expenseModel({
      ...req.body,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === "ROOT" ? "user" : "user_mosque",
    });

    const savedExpense = await expense.save();

    logger.info("Controller - expenses - createExpenseController - End");

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: expenseConstant.EXPENSE_CREATED,
      data: savedExpense,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - createExpenseController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

const getExpenseByIdController = async (req, res, next) => {
  try {
    logger.info("Controller - expenses - getExpenseByIdController - Start");

    const { expenseId } = req.params;
    const expense = await expenseModel
      .findById(expenseId)
      .populate("category", "name")
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
      .populate("payeeId", "payeeName");

    if (!expense) {
      return next(httpErrors.NotFound(expenseConstant.EXPENSE_NOT_FOUND));
    }

    logger.info("Controller - expenses - getExpenseByIdController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: expense,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - getExpenseByIdController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

const getAllExpensesController = async (req, res, next) => {
  try {
    logger.info("Controller - expenses - getAllExpensesController - Start");

    let { page = 1, limit = 10, search = "", startDate, endDate } = req.query;
    page = Number(page);
    limit = Number(limit);

    const query = { mosqueId: req.mosqueId };

    if (search) {
      query.description = { $regex: search, $options: "i" };
    }

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const skip_docs = (page - 1) * limit;
    const totalDocs = await expenseModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await expenseModel
      .find(query)
      .populate("category", "name")
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
      .populate("payeeId", "payeeName")
      .limit(limit)
      .skip(skip_docs)
      .sort(sortConstants["-createdAt"]);

    const data = {
      totalDocs,
      totalPages,
      docs,
      currentPage: page,
      hasNext: totalDocs > skip_docs + limit,
      hasPrev: page > 1,
      limit,
    };

    logger.info("Controller - expenses - getAllExpensesController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - getAllExpensesController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

const updateExpenseController = async (req, res, next) => {
  try {
    logger.info("Controller - expenses - updateExpenseController - Start");

    const { expenseId } = req.params;
    const details = { ...req.body };
    details.updatedBy = req.user._id;
    details.updatedRef = req.__type__ === "ROOT" ? "user" : "user_mosque";

    const updatedExpense = await expenseModel
      .findByIdAndUpdate(expenseId, details, { new: true })
      .populate("category", "name")
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!updatedExpense) {
      return next(httpErrors.NotFound(expenseConstant.EXPENSE_NOT_FOUND));
    }

    logger.info("Controller - expenses - updateExpenseController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: expenseConstant.EXPENSE_UPDATED,
      data: updatedExpense,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - updateExpenseController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

const deleteExpenseController = async (req, res, next) => {
  try {
    logger.info("Controller - expenses - deleteExpenseController - Start");

    const { expenseId } = req.params;
    const deletedExpense = await expenseModel.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return next(httpErrors.NotFound(expenseConstant.EXPENSE_NOT_FOUND));
    }

    logger.info("Controller - expenses - deleteExpenseController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: expenseConstant.EXPENSE_DELETED,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - deleteExpenseController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

module.exports = {
  createExpenseController,
  getExpenseByIdController,
  getAllExpensesController,
  updateExpenseController,
  deleteExpenseController,
};
