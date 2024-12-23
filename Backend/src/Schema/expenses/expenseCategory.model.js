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
  },
  { timestamps: true }
);

const expenseCategoryModel = mongoose.model("expensecategory", ModelSchema);
module.exports = expenseCategoryModel;
