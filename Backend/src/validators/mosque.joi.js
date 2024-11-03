const Joi = require("joi");

// const addressSchema = Joi.object({
//     street: Joi.string().required(),
//     city: Joi.string().required(),
//     state: Joi.string().optional(),
//     country: Joi.string().required(),
//     postalCode: Joi.string().required(),
//     coordinates: Joi.object({
//       latitude: Joi.number(),
//       longitude: Joi.number(),
//     }).optional(),
//   });

//   const contactInfoSchema = Joi.object({
//     phone: Joi.string().optional(),
//     email: Joi.string().email().optional(),
//     website: Joi.string().uri().optional(),
//   });

//   // Define the facilities schema
//   const facilitiesSchema = Joi.array().items(
//     Joi.string().valid(
//       'parking',
//       'wudu_area',
//       'women_section',
//       'wheelchair_access',
//       'funeral_service',
//       'marriage_hall',
//       'library',
//       'islamic_school'
//     )
//   );

// Define the prayerTimes schema
//   const prayerTimesSchema = Joi.object({
//     fajr: Joi.object({
//       azaan: Joi.string().optional(),
//       jamaat: Joi.string().optional(),
//     }).optional(),
//     dhuhr: Joi.object({
//       azaan: Joi.string().optional(),
//       jamaat: Joi.string().optional(),
//     }).optional(),
//     asr: Joi.object({
//       azaan: Joi.string().optional(),
//       jamaat: Joi.string().optional(),
//     }).optional(),
//     maghrib: Joi.object({
//       azaan: Joi.string().optional(),
//       jamaat: Joi.string().optional(),
//     }).optional(),
//     isha: Joi.object({
//       azaan: Joi.string().optional(),
//       jamaat: Joi.string().optional(),
//     }).optional(),
//     jumma: Joi.object({
//       azaan: Joi.string().optional(),
//       jamaat: Joi.string().optional(),
//       qutba: Joi.string().optional(),
//     }).optional(),
//   });

module.exports.createNewMosqueValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().optional(),
      country: Joi.string().required(),
      postalCode: Joi.string().required(),
    }),
    contactInfo: Joi.object({
      phone: Joi.string().optional(),
      email: Joi.string().email().optional(),
      website: Joi.string().uri().optional(),
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
  });

  return schema.validate(body);
};
