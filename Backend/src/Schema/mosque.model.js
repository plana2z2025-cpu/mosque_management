const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
        lowercase: true,
      },
      state: {
        type: String,
        lowercase: true,
      },
      country: {
        type: String,
        required: true,
        lowercase: true,
      },
      postalCode: {
        type: String,
        required: true,
        lowercase: true,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    contactInfo: {
      phone: String,
      email: String,
      website: String,
    },
    capacity: {
      regular: Number,
      friday: Number,
    },
    facilities: [
      {
        type: String,
        enum: [
          "parking",
          "wudu_area",
          "women_section",
          "wheelchair_access",
          "funeral_service",
          "marriage_hall",
          "library",
          "islamic_school",
        ],
      },
    ],
    imams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    administrators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    prayerTimes: {
      fajr: {
        azaan: String,
        jamaat: String,
      },
      dhuhr: {
        azaan: String,
        jamaat: String,
      },
      asr: {
        azaan: String,
        jamaat: String,
      },
      maghrib: {
        azaan: String,
        jamaat: String,
      },
      isha: {
        azaan: String,
        jamaat: String,
      },
      jumma: {
        azaan: String,
        jamaat: String,
        qutba: String,
      },
    },
    established: Date,
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    active: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const mosqueModel = mongoose.model("mosque", ModelSchema);

module.exports = mosqueModel;
