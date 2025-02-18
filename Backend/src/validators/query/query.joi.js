const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

const createQueryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().required().min(2).max(100),
    description: Joi.string().required().min(10).max(500),
    category: Joi.string()
      .valid(
        "religious",
        "administrative",
        "financial",
        "facility",
        "events",
        "other"
      )
      .required(),
    submittedBy: Joi.object({
      name: Joi.string().required().min(2).max(50),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
    }).required(),
    status: Joi.string()
      .valid("pending", "in_progress", "answered", "closed")
      .default("pending"),
    priority: Joi.string()
      .valid("low", "medium", "high", "urgent")
      .default("medium"),
    assignedTo: Joi.string().hex().length(24).optional(),
    responseContent: Joi.object({
      content: Joi.string().optional(),
      respondedBy: Joi.string().hex().length(24).optional(),
      respondedAt: Joi.date().optional(),
    }).optional(),
    attachments: Joi.array()
      .items(
        Joi.object({
          fileName: Joi.string().required(),
          fileType: Joi.string().required(),
          fileUrl: Joi.string().uri().required(),
        })
      )
      .optional(),
    tags: Joi.array().items(Joi.string()).optional(),
  }),
});

module.exports = {
  createQueryValidation,
};
