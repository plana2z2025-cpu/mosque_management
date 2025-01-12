const logger = require("../../Config/logger.config");
const eventModel = require("../../Schema/events/event.model");
const eventCategoryModel = require("../../Schema/events/eventCategory.model");
const httpErrors = require("http-errors");
const eventConstant = require("../../Constants/event.constants");
const moment = require("moment");
const mongoose = require("mongoose");
const { eventCategory } = require("../../Constants/model.constants");

// Controller for Creating Event
const createEventController = async (req, res, next) => {
  try {
    logger.info("Controller - events - event - createEventController - Start");
    const eventData = {
      ...req.body,
      mosqueId: req.mosqueId,
      createdBy: req.user._id,
      createdRef: req.__type__ === "ROOT" ? "user" : "user_mosque",
    };

    // Additional logic to ensure endDate is after startDate
    if (moment(eventData.endDate).isBefore(moment(eventData.startDate))) {
      return next(httpErrors.BadRequest("End date must be after start date"));
    }

    const eventCategoryExists = await eventCategoryModel.findById(
      eventData.type
    );
    if (!eventCategoryExists) {
      return next(
        httpErrors.BadRequest(eventConstant.EVENT_CATEGORY_NOT_FOUND)
      );
    }

    // Create the event
    const newEvent = new eventModel(eventData);
    await newEvent.save();

    logger.info(
      "Controller - events - event.controller - createEventController - Start"
    );

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: eventConstant.EVENT_CREATED,
      data: newEvent,
    });
  } catch (error) {
    logger.info(
      "Controller - events - event.controller - createEventController - Start"
    );
  }
};

// Get single event  by ID
const getEventByIdController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - getEventByIdController - Start"
    );
    const { eventId } = req.params;
    const eventDetails = await eventModel
      .findById(eventId)
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!eventDetails) {
      return next(httpErrors.NotFound(eventConstant.EVENT_NOT_FOUND));
    }
    logger.info(
      "Controller - events - eventCategory - getEventByIdController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: eventDetails,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - getEventByIdController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Get all event
const getAllEventController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - getAllEventController - Start"
    );
    let { page = 1, limit = 10, search = "" } = req.query;
    page = Number(page);
    limit = Number(limit);

    const skip_docs = (page - 1) * limit;
    const totalDocs = await eventModel.countDocuments({
      mosqueId: req.mosqueId,
    });
    const totalPages = Math.ceil(totalDocs / limit);

    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const docs = await eventModel
      .find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("type", "name")
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

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
      "Controller - events - eventCategory - getAllEventController - Error"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - getAllEventController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Update event
const updateEventController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - updateEventController - Start"
    );
    const { eventId } = req.params;
    const details = { ...req.body };
    details.updatedBy = req.user._id;
    details.updatedRef = req.__type__ === "ROOT" ? "user" : "user_mosque";

    const updatedCategory = await eventModel
      .findByIdAndUpdate(eventId, details, { new: true })
      .populate("createdBy", "name")
      .populate("updatedBy", "name");

    if (!updatedCategory) {
      return next(httpErrors.BadRequest(eventConstant.EVENT_NOT_FOUND));
    }

    logger.info(
      "Controller - events - eventCategory - updateEventController - End"
    );
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: updatedCategory,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - createEventController - error",
      error
    );
    next(httpErrors.InternalServerError(error));
  }
};

// Delete event
const deleteEventController = async (req, res, next) => {
  try {
    logger.info(
      "Controller - events - eventCategory - deleteEventController - Start"
    );
    const { eventId } = req.params;

    const deletedCategory = await eventModel.findByIdAndDelete(eventId);

    if (!deletedCategory) {
      return next(httpErrors.NotFound(eventConstant.EVENT_NOT_FOUND));
    }

    logger.info(
      "Controller - events - eventCategory - deleteEventController - End"
    );

    res.status(200).json({
      success: true,
      statusCode: true,
      message: eventConstant.EVENT_DELETED,
    });
  } catch (error) {
    logger.error(
      "Controller - events - eventCategory - deleteEventController - error",
      error
    );

    next(httpErrors.InternalServerError(error));
  }
};

module.exports = {
  createEventController,
  getEventByIdController,
  getAllEventController,
  deleteEventController,
  updateEventController,
};
