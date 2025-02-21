const { celebrate, Joi } = require("celebrate");

const createSettingsValidation = celebrate({
  body: Joi.object({
    ramadanTimingsVisible: Joi.boolean().default(false),
    queryFormVisible: Joi.boolean().default(true),
    currency: Joi.object({
      abbreviation: Joi.string().required(),
      currency: Joi.string().required(),
      code: Joi.string().required(),
      symbol: Joi.string().required(),
    }).required(),
  }),
});

const updateSettingsValidation = celebrate({
  body: Joi.object({
    ramadanTimingsVisible: Joi.boolean(),
    queryFormVisible: Joi.boolean(),
    currency: Joi.object({
      abbreviation: Joi.string().when(Joi.ref("currency"), {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      //   currency: Joi.string().when(Joi.ref("currency"), {
      //     is: Joi.exist(),
      //     then: Joi.required(),
      //   }),
      code: Joi.string().when(Joi.ref("currency"), {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      symbol: Joi.string().when(Joi.ref("currency"), {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    }),
  }),
});

module.exports = {
  createSettingsValidation,
  updateSettingsValidation,
};
