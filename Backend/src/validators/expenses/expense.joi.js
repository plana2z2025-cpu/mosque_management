const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");

// Expense Validations
const createExpenseValidation = celebrate({
  [Segments.BODY]: Joi.object({
    amount: Joi.number().positive().required(),
    description: Joi.string().required().min(3).max(500),
    date: Joi.date().required(),
    category: Joi.string().required(),
    paymentMethod: Joi.string()
      .valid("cash", "UPI", "card", "check", "other")
      .required(),
    payeeId: Joi.string().optional(),
    receiptImage: Joi.string().uri().allow(null, ""),
    status: Joi.string().valid("paid", "pending").default("pending"),
  }),
});

const updateExpenseValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    expenseId: Joi.string().required(),
  }),
  [Segments.BODY]: Joi.object({
    amount: Joi.number().positive(),
    description: Joi.string().min(3).max(500),
    date: Joi.date().max("now"),
    category: Joi.string(),
    paymentMethod: Joi.string().valid("cash", "UPI", "card", "check", "other"),
    receiptImage: Joi.string().uri().allow(null, ""),
    status: Joi.string().valid("paid", "pending"),
  }).min(1),
});

const getExpenseValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    expenseId: Joi.string().required(),
  }),
});

const getAllExpensesValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
    search: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date().min(Joi.ref("startDate")),
  }),
});

module.exports = {
  createExpenseValidation,
  updateExpenseValidation,
  getExpenseValidation,
  getAllExpensesValidation,
};
