const mongoose = require("mongoose");
const {
  user,
  userMosque,
  mosque,
  settings,
} = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
    },
    ramadanTimingsVisible: {
      type: Boolean,
      default: false,
    },
    queryFormVisible: {
      type: Boolean,
      default: true,
    },
    currency: {
      abbreviation: {
        type: String,
        required: true,
      },
      currency: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      symbol: {
        type: String,
        required: true,
      },
    },
    createdRef: {
      type: String,
      enum: [user, userMosque],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdRef",
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

const settingsModel = mongoose.model(settings, ModelSchema);

module.exports = settingsModel;
