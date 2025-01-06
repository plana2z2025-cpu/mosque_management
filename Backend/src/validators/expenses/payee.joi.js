const { Joi } = require("joi");
const { celebrate, Segments } = require("celebrate");

const createPayeeValidation = celebrate({
  [Segments.BODY]: Joi.object({
    payeeName: Joi.string().required().min(2).max(50),
    contactNumber: Joi.string().optional().allow(null, ""),
    emailAddress: Joi.string().optional().allow(null, "").email(),
    bankDetails: Joi.object({
      accountNumber: Joi.string().optional().allow(null, ""),
      bankName: Joi.string().optional().allow(null, ""),
      ifscCode: Joi.string().optional().allow(null, ""),
    }).optional(),
    upiPhoneNumber: Joi.string().optional().allow(null, ""),
  }),
});

const updatePayeeValidation = celebrate({
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().required(), // Assuming you're using a string ID for the payee
  }),
  [Segments.BODY]: Joi.object({
    payeeName: Joi.string().optional().min(2).max(50),
    contactNumber: Joi.string().optional().allow(null, ""),
    emailAddress: Joi.string().optional().allow(null, "").email(),
    bankDetails: Joi.object({
      accountNumber: Joi.string().optional().allow(null, ""),
      bankName: Joi.string().optional().allow(null, ""),
      ifscCode: Joi.string().optional().allow(null, ""),
    }).optional(),
    upiPhoneNumber: Joi.string().optional().allow(null, ""),
  }),
});

const allPayeesValidation = celebrate({
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).optional(),
  }),
});

module.exports = {
  createPayeeValidation,
  updatePayeeValidation,
  allPayeesValidation,
};
