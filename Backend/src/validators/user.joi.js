const { celebrate, Joi } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

// register schema
const RegisterUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  }),
});

// Login schema
const LoginUserValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  }),
});
const LoginSubUserValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().label("name"),
    password: passwordComplexity().required().label("password"),
    mosqueUniqueId: Joi.string().required().label("Mosque Unique ID"),
  }),
});

// Update password schema
const UpdatePasswordValidation = celebrate({
  body: Joi.object({
    old_password: passwordComplexity().required().label("Old Password"),
    new_password: passwordComplexity().required().label("New Password"),
  }),
});

module.exports = {
  RegisterUserValidation,
  LoginUserValidation,
  UpdatePasswordValidation,
  LoginSubUserValidation,
};
