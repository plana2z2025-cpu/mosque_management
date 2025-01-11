const expenseModel = require("../../Schema/expenses/expense.model");
const expenseCategoryModel = require("../../Schema/expenses/expenseCategory.model");
const payeeModel = require("../../Schema/expenses/payee.model");
const mongoose = require("mongoose");
const logger = require("../../Config/logger.config");
const httpErrors = require("http-errors");
const { expenseCategory } = require("../../Constants/model.constants");

// -----------------------------------------------------
// GRAPHQL RESOLVERS
// -----------------------------------------------------
const expenseGraphController = async (req, res, next) => {
  try {
    logger.info("Controller - graph-expenses - expenseGraphController - Start");
    const expenseTypeGraphAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: expenseCategory,
          localField: "_id",
          foreignField: "_id",
          as: "expenseType",
        },
      },

      {
        $project: {
          _id: 1,
          count: 1,
          eventType: { $arrayElemAt: ["$expenseType.name", 0] },
        },
      },
    ];

    const expenseStatusGraphAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ];

    const expensePaymentGraphAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
        },
      },
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ];

    const expenseTypeGraph = await expenseModel.aggregate(
      expenseTypeGraphAggregation
    );
    const expenseStatusGraph = await expenseModel.aggregate(
      expenseStatusGraphAggregation
    );
    const expensePaymentGraph = await expenseModel.aggregate(
      expensePaymentGraphAggregation
    );

    logger.info("Controller - graph-expenses - expenseGraphController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        expenseTypeGraph,
        expenseStatusGraph,
        expensePaymentGraph,
      },
    });
  } catch (error) {
    logger.error(
      "Controller - graph-expenses - expenseGraphController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

const expensePayeeGraphController = async (req, res, next) => {
  const { payeeId } = req.params;
  try {
    logger.info(
      "Controller - graph-expenses - expensePayeeGraphController - Start"
    );
    const payeeExpenseTypeGraphAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
          payeeId: new mongoose.Types.ObjectId(payeeId),
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: expenseCategory,
          localField: "_id",
          foreignField: "_id",
          as: "expenseType",
        },
      },

      {
        $project: {
          _id: 1,
          count: 1,
          eventType: { $arrayElemAt: ["$expenseType.name", 0] },
        },
      },
    ];

    const payeeExpenseStatusGraphAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
          payeeId: new mongoose.Types.ObjectId(payeeId),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ];

    const payeeExpensePaymentGraphAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
          payeeId: new mongoose.Types.ObjectId(payeeId),
        },
      },
      {
        $group: {
          _id: "$paymentMethod",
          count: { $sum: 1 },
        },
      },
    ];

    const payeeExpenseTypeGraph = await expenseModel.aggregate(
      payeeExpenseTypeGraphAggregation
    );
    const payeeExpenseStatusGraph = await expenseModel.aggregate(
      payeeExpenseStatusGraphAggregation
    );
    const payeeExpensePaymentGraph = await expenseModel.aggregate(
      payeeExpensePaymentGraphAggregation
    );

    logger.info(
      "Controller - graph-expenses - expensePayeeGraphController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        payeeExpenseTypeGraph,
        payeeExpenseStatusGraph,
        payeeExpensePaymentGraph,
      },
      type: "payee expense graph",
    });
  } catch (error) {
    logger.error(
      "Controller - graph-expenses - expensePayeeGraphController - error",
      error
    );
    next(httpErrors.InternalServerError(error?.message));
  }
};

module.exports = {
  expenseGraphController,
  expensePayeeGraphController,
};
