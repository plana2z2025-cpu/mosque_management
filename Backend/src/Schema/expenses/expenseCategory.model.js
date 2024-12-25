const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: String,
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mosque",
      required: true,
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
  { timestamps: true }
);

const expenseCategoryModel = mongoose.model("expensecategory", ModelSchema);
module.exports = expenseCategoryModel;
