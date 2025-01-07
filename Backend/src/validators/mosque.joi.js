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
    })
      .required()
      .label("address details is required"),
    contactInfo: Joi.object({
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
      website: Joi.string().uri().optional(),
    })
      .required()
      .label("contactInfo details is required"),
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
    })
      .required()
      .label("timing details is required"),
    user: Joi.object({
      name: Joi.string().required().label("name"),
      email: Joi.string().email().required().label("email"),
      phone: Joi.string().required(),
      password: passwordComplexity().required().label("password"),
    })
      .required()
      .label("user  details is required"),
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

const updateMosqueDetailsValidation = celebrate({
  body: Joi.object({
    name: Joi.string().optional(),
    slug: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().optional(),
      city: Joi.string().optional(),
      state: Joi.string().optional(),
      stateCode: Joi.string().optional(),
      country: Joi.string().optional(),
      countryCode: Joi.string().optional(),
      postalCode: Joi.string().optional(),
      coordinates: Joi.object({
        latitude: Joi.number().optional(),
        longitude: Joi.number().optional(),
      }),
    })
      .optional()
      .label("address details is required"),
    contactInfo: Joi.object({
      phone: Joi.string().optional(),
      email: Joi.string().email().optional(),
      website: Joi.string().uri().optional(),
    })
      .optional()
      .label("contactInfo details is required"),
    aboutInfo: Joi.object({
      established: Joi.date().optional(),
      capacity: Joi.object({
        regular: Joi.number().optional(),
        friday: Joi.number().optional(),
      }),
    }),
    facilities: Joi.array().items(
      Joi.string()
        .valid(
          "parking",
          "wudu_area",
          "women_section",
          "wheelchair_access",
          "funeral_service",
          "marriage_hall",
          "library",
          "islamic_school"
        )
        .optional()
    ),
  }),
});

const updateMosqueTimingsValidation = celebrate({
  body: Joi.object({
    fajr: Joi.object({
      azaan: Joi.string().required(),
      jamaat: Joi.string().required(),
    }).optional(),
    dhuhr: Joi.object({
      azaan: Joi.string().required(),
      jamaat: Joi.string().required(),
    }).optional(),
    asr: Joi.object({
      azaan: Joi.string().required(),
      jamaat: Joi.string().required(),
    }).optional(),
    maghrib: Joi.object({
      azaan: Joi.string().required(),
      jamaat: Joi.string().required(),
    }).optional(),
    isha: Joi.object({
      azaan: Joi.string().required(),
      jamaat: Joi.string().required(),
    }).optional(),
    jumma: Joi.object({
      azaan: Joi.string().required(),
      jamaat: Joi.string().required(),
      qutba: Joi.string().required(),
    }).optional(),
  }),
});

module.exports = {
  createNewMosqueValidation,
  createMosqueEmailValidation,
  createMosqueSlugValidation,
  updateMosqueDetailsValidation,
  updateMosqueTimingsValidation,
};
