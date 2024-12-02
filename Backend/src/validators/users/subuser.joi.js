const Joi = require("joi");
const { celebrate, Segments } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

const createSubUserValidation = celebrate({
  [Segments.BODY]: Joi.object({
    name: Joi.string().required().label("name"),
    password: passwordComplexity().required().label("password"),
  }),
});

module.exports = {
  createSubUserValidation,
};
