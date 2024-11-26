const mongoose = require("mongoose");
const crypto = require("crypto");

const ModelSchema = new mongoose.Schema(
  {
    uniqueId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
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
        required: true,
        lowercase: true,
      },
      stateCode: {
        type: String,
        required: true,
        lowercase: true,
      },
      country: {
        type: String,
        required: true,
        lowercase: true,
      },
      countryCode: {
        type: String,
        required: true,
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
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      website: String,
    },
    aboutInfo: {
      established: Date,
      capacity: {
        regular: Number,
        friday: Number,
      },
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
        ref: "user_mosque",
      },
    ],
    timings: {
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

ModelSchema.pre("save", function (next) {
  if (!this.uniqueId) {
    const randomStr = crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()
      .slice(0, 4);
    this.uniqueId = `${this.address.countryCode.toUpperCase()}${this.address.stateCode.toUpperCase()}_${randomStr}`;
  }
  next();
});

const mosqueModel = mongoose.model("mosque", ModelSchema);

module.exports = mosqueModel;
