const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    mosque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mosque",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "lecture",
        "seminar",
        "workshop",
        "conference",
        "iftar",
        "community_gathering",
        "charity_event",
        "youth_program",
        "children_class",
        "ramadan_program",
        "eid_celebration",
      ],
      required: true,
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    speakers: [
      {
        name: {
          type: String,
          trim: true,
        },
        bio: String,
        title: String,
      },
    ],
    targetAudience: {
      type: [String],
      enum: [
        "men",
        "women",
        "children",
        "youth",
        "seniors",
        "families",
        "converts",
        "all",
      ],
    },
    languagesSupported: [
      {
        type: String,
        enum: ["arabic", "english", "urdu", "spanish", "french", "other"],
      },
    ],
    contactInfo: {
      name: String,
      email: {
        type: String,
        lowercase: true,
        validate: {
          validator: function (v) {
            return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
          },
          message: "Please enter a valid email",
        },
      },
      phone: String,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    coverImage: {
      type: String,
      validate: {
        validator: function (v) {
          return /^https?:\/\//.test(v);
        },
        message: "Cover image must be a valid URL",
      },
    },
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model(ModelSchema);

module.exports = mongoose.model("event", eventSchema);
