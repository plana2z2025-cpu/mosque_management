const queryModel = require("../../Schema/query/query.model");
const logger = require("../../Config/logger.config");
const httpErrors = require("http-errors");
const queryConstants = require("../../Constants/query.constants");
const errorHandling = require("../../Utils/errorHandling");

const addQueryController = async (req, res, next) => {
  try {
    logger.info("Controller - query - addQueryController - Start");
    const { name, email, message } = req.body;
    const newQuery = new queryModel({ name, email, message });
    const savedQuery = await newQuery.save();

    logger.info("Controller - query - addQueryController - End");

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: queryConstants.QUERY_CREATED,
      data: savedQuery,
    });
  } catch (error) {
    logger.error("Controller - query - addQueryController - error", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  addQueryController,
};
