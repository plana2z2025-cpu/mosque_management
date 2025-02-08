const logger = require("../../Config/logger.config");
const eventModel = require("../../Schema/events/event.model");
const mongoose = require("mongoose");
const { eventCategory } = require("../../Constants/model.constants");

const eventGraphController = async (req, res, next) => {
  try {
    logger.info("Controller - events - eventGraphController - Start");
    const eventTypeAggregation = [
      {
        $match: {
          mosqueId: new mongoose.Types.ObjectId(req.mosqueId),
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: eventCategory,
          localField: "_id",
          foreignField: "_id",
          as: "eventType",
        },
      },

      {
        $project: {
          _id: 1,
          count: 1,
          eventType: { $arrayElemAt: ["$eventType.name", 0] },
        },
      },
    ];

    const eventStatusAggregation = [
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

    const eventTypeBasedCount = await eventModel.aggregate(
      eventTypeAggregation
    );

    const eventStatusBasedCount = await eventModel.aggregate(
      eventStatusAggregation
    );

    const enumStatus = ["draft", "published", "cancelled"];

    const statusCountMap = eventStatusBasedCount.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Create an array to hold the final counts, ensuring all statuses are represented
    const finalCounts = enumStatus.map((status) => ({
      status,
      count: statusCountMap[status] || 0, // Default to 0 if not found
    }));

    logger.info("Controller - events - eventGraphController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Event Graph Data",
      data: {
        eventTypeBasedCount,
        eventStatusBasedCount: finalCounts,
      },
    });
  } catch (error) {
    logger.error("Controller - events - eventGraphController - error", error);
    errorHandling.handleCustomErrorService(error, next);
  }
};

module.exports = {
  eventGraphController,
};
