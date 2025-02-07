const mongoose = require("mongoose");

const {
  ramadanTimings,
  user,
  userMosque,
  mosque,
} = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
    },
    days: [
      {
        uuid: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
        dayOfRamadan: {
          type: Number,
          required: true,
          min: 1,
          max: 31,
        },
        sehri_start: {
          type: String,
          required: true,
        },
        sehri_end: {
          type: String,
          required: true,
        },
        iftar: {
          type: String,
          required: true,
        },
      },
    ],
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
    updatedRef: {
      type: String,
      enum: [user, userMosque],
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

const ramadanTimingModel = mongoose.model(ramadanTimings, ModelSchema);

module.exports = ramadanTimingModel;
