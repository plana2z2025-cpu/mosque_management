const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mosque",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "eventcategory",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: String,
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
      default: "men",
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
    contactInfo: {
      name: String,
      email: String,
      phone: String,
    },
    coverImage: String,
    tags: [String],
    status: {
      type: String,
      enum: ["draft", "published", "cancelled"],
      default: "draft",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdRef",
    },
    createdRef: {
      type: String,
      enum: ["user", "user_mosque"],
      required: true,
    },
    updatedRef: {
      type: String,
      enum: ["user", "user_mosque"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "updatedRef",
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model("event", ModelSchema);

module.exports = eventModel;
