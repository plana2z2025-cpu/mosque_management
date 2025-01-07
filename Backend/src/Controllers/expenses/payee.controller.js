const payeeModel = require("../../Schema/expenses/payee.model");
const logger = require("../../Config/logger.config");
const httpErrors = require("http-errors");
const moment = require("moment");
const payeeConstant = require("../../Constants/payee.constants");
const sortConstants = require("../../Constants/sort.constants");

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
      //   createdRef: req.__type__ === "ROOT" ? "user" : "user_mosque",
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
    next(httpErrors.InternalServerError(error.message));
  }
};

const getPayeeByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - getPayeeByIdController - Start"
    );

    const { payeeId } = req.params;
    const payee = await payeeModel.findById(payeeId);
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
    next(httpErrors.InternalServerError(error));
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
    next(httpErrors.InternalServerError(error));
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
      updatedRef: req.__type__ === "ROOT" ? "user" : "user_mosque",
    };

    const updatedPayee = await payeeModel.findByIdAndUpdate(payeeId, details, {
      new: true,
    });
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
    next(httpErrors.InternalServerError(error));
  }
};

const deletePayeeController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - expenses - payee - deletePayeeController - Start"
    );

    const { payeeId } = req.params;
    const deletedPayee = await payeeModel.findByIdAndDelete(payeeId);

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
    next(httpErrors.InternalServerError(error));
  }
};

module.exports = {
  createPayeeController,
  getPayeeByIdController,
  getAllPayeesController,
  updatePayeeController,
  deletePayeeController,
};
