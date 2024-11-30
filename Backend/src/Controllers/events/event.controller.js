const logger = require("../../Config/logger.config");
const eventModel = require("../../Schema/events/event.model");
const httpErrors = require("http-errors");
const CategoryConstant = require("../../Constants/event.constants");

// Controller for Creating Event
const createEventController = async (req, res) => {
  try {
    logger.info("Controller - events - event - createEventController - Start");
    const eventData = req.body;

    // Additional logic to ensure endDate is after startDate
    if (new Date(eventData.endDate) < new Date(eventData.startDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    // Create the event
    const newEvent = new Model(eventData);
    await newEvent.save();

    logger.info(
      "Controller - events - event.controller - createEventController - Start"
    );

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    logger.info(
      "Controller - events - event.controller - createEventController - Start"
    );
  }
};
