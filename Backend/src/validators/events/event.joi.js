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
          title: Joi.string().optional(),
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

module.exports = {
  createEventValidation,
};
