const logger = require("../../Config/logger.config");
const ramadanTimingModel = require("../../Schema/ramadan/ramadan_timings.model");
const httpErrors = require("http-errors");
const ramadanTimingsConstant = require("../../Constants/ramadan_timings.constants");
const moment = require("moment");
const { userMosque, user } = require("../../Constants/model.constants");
const { v4: uuidv4 } = require("uuid");

const bulkUploadRamadanTimingsController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - ramadan - ramadan_timings - bulkUploadRamadanTimingsController - Start"
    );

    const mosqueId = req.mosqueId;
    const role = req.__type__;
    let ramadanTimingsData = null;
    let isExist = await ramadanTimingModel.findOne({ mosqueId }).lean();

    let updateDays = req.body.days?.map((singleDay) => {
      return {
        ...singleDay,
        uuid: uuidv4(),
        date: moment(singleDay?.date, "YYYY-MM-DD").format(),
      };
    });
    let details = {
      days: updateDays,
    };

    if (isExist) {
      details.updatedBy = req.user._id;
      details.updatedRef = role === "admin" ? user : userMosque;
      ramadanTimingsData = await ramadanTimingModel.findOneAndUpdate(
        { mosqueId },
        details,
        { new: true }
      );
    } else {
      details.mosqueId = mosqueId;
      details.createdBy = req.user._id;
      details.createdRef = role === "admin" ? user : userMosque;
      ramadanTimingsData = new ramadanTimingModel(details);
      await ramadanTimingsData.save();
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: ramadanTimingsData,
    });

    logger.info(
      "Controller - ramadan - ramadan_timings - bulkUploadRamadanTimingsController - End"
    );
  } catch (error) {
    logger.error(
      "Controller - ramadan - ramadan_timings - bulkUploadRamadanTimingsController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

const getMosqueRamadanTimingsController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - ramadan - ramadan_timings - getRamadanTimingsController - Start"
    );

    const mosqueId = req?.mosqueId;
    const data = await ramadanTimingModel
      .findOne({ mosqueId })
      .populate("createdBy", "name")
      .populate("updatedBy", "name")
      .lean();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: data || {},
    });
  } catch (error) {
    logger.error(
      "Controller - ramadan - ramadan_timings - getRamadanTimingsController- Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports = {
  bulkUploadRamadanTimingsController,
  getMosqueRamadanTimingsController,
};
