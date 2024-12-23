const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

const createExpenseValidation = celebrate({
  [Segments.BODY]: Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().required().min(3).max(500),
    date: Joi.date().max("now").required(),
    category: Joi.string().required(),
    paymentMethod: Joi.string().valid("cash", "transfer", "check").required(),
    receiptImage: Joi.string().uri().allow(null, ""),
    status: Joi.string().valid("paid", "pending").default("pending"),
  }),
});

module.exports = {
  createExpenseValidation,
};
