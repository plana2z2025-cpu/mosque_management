const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

//    .valid(
//      'Religious Education',
//      'Community Services',
//      'Youth Development',
//      'Spiritual Growth',
//      'Family Programs',
//      'Social Welfare',
//      'Islamic Studies',
//      'Charitable Initiatives',
//      'Cultural Engagement',
//      'Interfaith Dialogue'
//    )
const createEventCategory = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().label("Event Category Name"),
    description: Joi.string().min(20).optional().label("Description"),
    icon: Joi.string().uri().optional().label("Icon URL"),
  }),
});

const updateEventCategory = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().hex().length(24).required().label("Category ID"),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().label("Event Category Name"),
    description: Joi.string().min(20).optional().label("Description"),
    icon: Joi.string().uri().optional().label("Icon URL"),
  }),
});

const getAllEventCategories = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number()
      .integer()
      .min(1)
      .optional()
      .default(1)
      .label("Page Number"),
    limit: Joi.number()
      .integer()
      .min(1)
      .max(50)
      .optional()
      .default(10)
      .label("Items per Page"),
    search: Joi.string().max(50).optional().label("Search Term"),
  }),
});

module.exports = {
  createEventCategory,
  updateEventCategory,
  getAllEventCategories,
};
