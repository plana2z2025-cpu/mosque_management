const {
  expense,
  expenseCategory,
  user,
  userMosque,
  payeeRecipient,
  mosque,
} = require("../../Constants/model.constants");

const mongoose = require("mongoose");

const enumPaymentMethod = ["cash", "UPI", "card", "check", "other"];
const enumStatus = ["paid", "pending"];

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
      ref: expenseCategory,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: enumPaymentMethod,
      required: true,
    },
    receiptImage: String,
    status: {
      type: String,
      enum: enumStatus,
      default: enumStatus[1],
    },
    payeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: payeeRecipient,
    },
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
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

const expenseModel = mongoose.model(expense, ModelSchema);
module.exports = expenseModel;
