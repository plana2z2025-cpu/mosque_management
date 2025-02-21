const mongoose = require("mongoose");
const {
  mosque,
  user,
  userMosque,
  expenseCategory,
} = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: String,
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
    },
    default: {
      type: Boolean,
      default: false,
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
    },
    updatedRef: {
      type: String,
      enum: [user, userMosque],
    },
  },
  { timestamps: true }
);

const expenseCategoryModel = mongoose.model(expenseCategory, ModelSchema);
module.exports = expenseCategoryModel;
