const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

const createSubUserValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().label("name"),
    password: passwordComplexity().required().label("password"),
    permissions: Joi.object({
      read: Joi.boolean().required().label("read"),
      create: Joi.boolean().required().label("create"),
      update: Joi.boolean().required().label("update"),
      delete: Joi.boolean().required().label("delete"),
    })
      .required()
      .label("permissions"),
  }),
});

module.exports = {
  createSubUserValidation,
};
