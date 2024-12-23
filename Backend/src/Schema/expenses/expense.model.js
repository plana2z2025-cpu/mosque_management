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
      enum: ["cash", "UPI", "card", "check"],
      required: true,
    },
    receiptImage: String,
    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

expenseModel = mongoose.model("expense", ModelSchema);
module.exports = expenseModel;
