const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expensecategory",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "UPI", "card", "check", "other"],
      required: true,
    },
    receiptImage: String,
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
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

const expenseModel = mongoose.model("expense", ModelSchema);
module.exports = expenseModel;
