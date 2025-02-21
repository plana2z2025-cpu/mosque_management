const mongoose = require("mongoose");
const {
  event,
  eventCategory,
  user,
  userMosque,
  mosque,
} = require("../../Constants/model.constants");

const enumStatus = ["draft", "published", "cancelled"];
const enumTargetAudience = [
  "men",
  "women",
  "children",
  "youth",
  "seniors",
  "families",
  "converts",
  "all",
];

const ModelSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
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
      ref: eventCategory,
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
    time: {
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
      default: enumTargetAudience[0],
      enum: enumTargetAudience,
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
      enum: enumStatus,
      default: enumStatus[1],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdRef",
    },
    createdRef: {
      type: String,
      enum: [user, userMosque],
      required: true,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "updatedRef",
      required: true,
    },
    updatedRef: {
      type: String,
      enum: [user, userMosque],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventModel = mongoose.model(event, ModelSchema);

module.exports = eventModel;
