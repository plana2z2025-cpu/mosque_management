const payeeModel = require("../../Schema/expenses/payee.model");
const expenseModel = require("../../Schema/expenses/expense.model");
const logger = require("../../Config/logger.config");
const httpErrors = require("http-errors");
const payeeConstant = require("../../Constants/payee.constants");
const sortConstants = require("../../Constants/sort.constants");
const errorHandling = require("../../Utils/errorHandling");
const { ADMIN } = require("../../Constants/roles.constants");

const createPayeeController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - createPayeeController - Start"
    );

    const isExist = await payeeModel.findOne({
      payeeName: req.body.payeeName,
      mosqueId: req.mosqueId,
    });
    if (isExist) {
      return next(httpErrors.Conflict(payeeConstant.PAYEE_EXIST));
    }

    const payee = new payeeModel({
      ...req.body,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === ADMIN ? "user" : "user_mosque",
      updatedBy: req.user._id,
      updatedRef: req.__type__ === ADMIN ? "user" : "user_mosque",
    });

    const savedPayee = await payee.save();

    logger.info("Controller - expenses - payee - createPayeeController - End");

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: payeeConstant.PAYEE_CREATED,
      data: savedPayee,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - payee - createPayeeController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getPayeeByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - getPayeeByIdController - Start"
    );

    const { payeeId } = req.params;
    const payee = await payeeModel.findOne({
      _id: payeeId,
      mosqueId: req.mosqueId,
    });
    //   .populate("createdBy", "name")
    //   .populate("updatedBy", "name");

    if (!payee) {
      return next(httpErrors.NotFound(payeeConstant.PAYEE_NOT_FOUND));
    }

    logger.info("Controller - expenses - payee - getPayeeByIdController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: payee,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - payee - getPayeeByIdController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getAllPayeesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - getAllPayeesController - Start"
    );

    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const query = { mosqueId: req.mosqueId };
    if (search) {
      query.payeeName = { $regex: search, $options: "i" };
    }

    const skip_docs = (page - 1) * limit;
    const totalDocs = await payeeModel.countDocuments({
      mosqueId: req.mosqueId,
    });
    const totalPages = Math.ceil(totalDocs / limit);

    const docs = await payeeModel
      .find(query)
      //   .populate("createdBy", "name")
      //   .populate("updatedBy", "name")
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

    logger.info("Controller - expenses - payee - getAllPayeesController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - payee - getAllPayeesController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const updatePayeeController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - updatePayeeController - Start"
    );

    const { payeeId } = req.params;
    const details = {
      ...req.body,
      updatedBy: req.user._id,
      updatedRef: req.__type__ === ADMIN ? "user" : "user_mosque",
    };

    const updatedPayee = await payeeModel.findOneAndUpdate(
      { _id: payeeId, mosqueId: req.mosqueId },
      details,
      {
        new: true,
      }
    );
    //   .populate("createdBy", "name")
    //   .populate("updatedBy", "name");

    if (!updatedPayee) {
      return next(httpErrors.NotFound(payeeConstant.PAYEE_NOT_FOUND));
    }

    logger.info("Controller - expenses - payee - updatePayeeController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: payeeConstant.PAYEE_UPDATED,
      data: updatedPayee,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - payee - updatePayeeController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const deletePayeeController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - deletePayeeController - Start"
    );

    const { payeeId } = req.params;
    console.log("Deleting payee with mosqueId:", req.mosqueId);
    const deletedPayee = await payeeModel.findOneAndDelete({
      _id: payeeId,
      mosqueId: req.mosqueId,
    });

    if (!deletedPayee) {
      return next(httpErrors.NotFound(payeeConstant.PAYEE_NOT_FOUND));
    }

    logger.info("Controller - expenses - payee - deletePayeeController - End");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: payeeConstant.PAYEE_DELETED,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - payee - deletePayeeController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

const getAllPayeesExpensesController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - getAllPayeesExpensesController - Start"
    );

    const { payeeId } = req.params;
    let { page = 1, limit = 10, sort = "-createdAt", search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const query = { payeeId, mosqueId: req.mosqueId };
    if (search) {
      query.description = { $regex: search, $options: "i" };
    }

    const skip_docs = (page - 1) * limit;
    const totalDocs = await expenseModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    const expenses = await expenseModel
      .find(query)
      .populate("category", "name")
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
      .populate("payeeId", "payeeName")
      .limit(limit)
      .skip(skip_docs)
      .sort(sort);

    const data = {
      totalDocs,
      totalPages,
      docs: expenses,
      currentPage: page,
      hasNext: totalDocs > skip_docs + limit,
      hasPrev: page > 1,
      limit,
    };

    logger.info(
      "Controller - expenses - payee - getAllPayeesExpensesController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - expenses - payee - getAllPayeesExpensesController - error",
      error
    );
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  createPayeeController,
  getPayeeByIdController,
  getAllPayeesController,
  updatePayeeController,
  deletePayeeController,
  getAllPayeesExpensesController,
};
