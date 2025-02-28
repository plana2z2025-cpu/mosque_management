const mongoose = require("mongoose");
const {
  user,
  userMosque,
  mosque,
  fridayCollection,
} = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    offline_amount: {
      type: Number,
      default: 0,
    },
    online_amount: {
      type: Number,
      default: 0,
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

const fridayCollectionModel = mongoose.model(fridayCollection, ModelSchema);

module.exports = fridayCollectionModel;
