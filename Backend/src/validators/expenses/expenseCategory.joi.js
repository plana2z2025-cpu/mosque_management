const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

const createExpenseCategoryValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().min(2).max(50),
    description: Joi.string().max(200).allow(null, ""),
  }),
});

const updateExpenseCategoryValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    categoryId: Joi.string()
      .hex()
      .length(24)
      .required()
      .label("Expense Category ID"),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().optional().label("Event Category Name"),
    description: Joi.string().min(20).optional().label("Description"),
  }),
});

const getAllExpenseCategoriesValidation = celebrate({
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
  createExpenseCategoryValidation,
  updateExpenseCategoryValidation,
  getAllExpenseCategoriesValidation,
};
