// utils/errorHandler.js
const httpErrors = require("http-errors");

class ErrorHandler {
  handleCustomErrorService(error, next) {
    let httpError;
    if (error instanceof httpErrors.HttpError) {
      httpError = error;
    } else if (
      error.name === "MongooseError" &&
      error.message.includes("buffering timed out")
    ) {
      httpError = httpErrors.ServiceUnavailable(
        "Service temporarily unavailable. Please try again later"
      );
    } else if (error.name === "ValidationError") {
      httpError = httpErrors.BadRequest(error.message);
    } else {
      httpError = httpErrors.InternalServerError(error.message);
    }

    next(httpError);
  }
}

module.exports = new ErrorHandler();
