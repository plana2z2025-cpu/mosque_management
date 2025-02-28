const { celebrate, Joi } = require("celebrate");

const createFridayCollectionValidation = celebrate({
  body: Joi.object({
    date: Joi.date().iso().required().label("Date should be YYYY-MM-DD"),
    online_amount: Joi.number().required().default(0),
    offline_amount: Joi.number().required().default(0),
  }),
});

const getAllFridayCollectionValidation = celebrate({
  query: Joi.object({
    startAmount: Joi.number(),
    endAmount: Joi.number(),
    startDate: Joi.date().iso().label("Date should be YYYY-MM-DD"),
    endDate: Joi.date().iso().label("Date should be YYYY-MM-DD"),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).default(10),
  }),
});

module.exports = {
  createFridayCollectionValidation,
  getAllFridayCollectionValidation,
};
