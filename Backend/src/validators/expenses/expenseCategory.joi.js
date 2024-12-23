const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

const createExpenseCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().max(200).allow(null, ""),
  }),
});

module.exports = {
  createExpenseCategoryValidation,
};
