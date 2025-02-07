const { celebrate, Joi } = require("celebrate");

const bulkUploadTimingsValidation = celebrate({
  body: Joi.object({
    days: Joi.array()
      .items(
        Joi.object({
          date: Joi.date().iso().required().label("date format YYYY-MM-DD"),
          dayOfRamadan: Joi.number().integer().min(1).max(31).required(),
          sehri_start: Joi.string().required(),
          sehri_end: Joi.string().required(),
          iftar: Joi.string().required(),
        })
      )
      .required(),
  }),
});

module.exports = {
  bulkUploadTimingsValidation,
};
