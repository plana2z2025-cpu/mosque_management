const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

const createEventValidation = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required(),
    type: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    time: Joi.date().required(),
    location: Joi.string().required(),
    speakers: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim().optional(),
          bio: Joi.string().allow("").optional(),
          title: Joi.string().allow("").optional(),
        })
      )
      .min(1),
    targetAudience: Joi.array()
      .items(
        Joi.string().valid(
          "men",
          "women",
          "children",
          "youth",
          "seniors",
          "families",
          "converts",
          "all"
        )
      )
      .optional(),
    contactInfo: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
    }).optional(),
    coverImage: Joi.string().optional(),
    tags: Joi.array().items(Joi.string()).optional(),
    status: Joi.string().valid("draft", "published", "cancelled").optional(),
  }),
});

const getAllEventsControllerValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
    search: Joi.string().allow("").optional(),
    startDate: Joi.date().iso().optional().label("Date should be YYYY-MM-DD"),
    endDate: Joi.date().iso().optional().label("Date should be YYYY-MM-DD"),
  }),
});

module.exports = {
  createEventValidation,
  getAllEventsControllerValidation,
};
