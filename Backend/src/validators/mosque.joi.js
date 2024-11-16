const { celebrate, Joi } = require("celebrate");
const passwordComplexity = require("joi-password-complexity");

const createNewMosqueValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    slug: Joi.string()
      .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      stateCode: Joi.string().required(),
      country: Joi.string().required(),
      countryCode: Joi.string().required(),
      postalCode: Joi.string().required(),
      coordinates: Joi.object({
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
      }),
    }),
    contactInfo: Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      website: Joi.string().uri().optional(),
    }),
    aboutInfo: Joi.object({
      established: Joi.date().optional(),
      capacity: Joi.object({
        regular: Joi.number().optional(),
        friday: Joi.number().optional(),
      }),
    }),
    facilities: Joi.array().items(
      Joi.string().valid(
        "parking",
        "wudu_area",
        "women_section",
        "wheelchair_access",
        "funeral_service",
        "marriage_hall",
        "library",
        "islamic_school"
      )
    ),
    timings: Joi.object({
      fajr: Joi.object({
        azaan: Joi.string().required(),
        jamaat: Joi.string().required(),
      }).required(),
      dhuhr: Joi.object({
        azaan: Joi.string().required(),
        jamaat: Joi.string().required(),
      }).required(),
      asr: Joi.object({
        azaan: Joi.string().required(),
        jamaat: Joi.string().required(),
      }).required(),
      maghrib: Joi.object({
        azaan: Joi.string().required(),
        jamaat: Joi.string().required(),
      }).required(),
      isha: Joi.object({
        azaan: Joi.string().required(),
        jamaat: Joi.string().required(),
      }).required(),
      jumma: Joi.object({
        azaan: Joi.string().required(),
        jamaat: Joi.string().required(),
        qutba: Joi.string().required(),
      }).required(),
    }),
    user: Joi.object({
      name: Joi.string().required().label("name"),
      email: Joi.string().email().required().label("email"),
      password: passwordComplexity().required().label("password"),
    }),
  }),
});

const createMosqueEmailValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required().label("email"),
  }),
});

const createMosqueSlugValidation = celebrate({
  body: Joi.object({
    slug: Joi.string()
      .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .required(),
  }),
});

module.exports = {
  createNewMosqueValidation,
  createMosqueEmailValidation,
  createMosqueSlugValidation,
};
