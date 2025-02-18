const mongoose = require("mongoose");
const { payeeRecipient } = require("../../Constants/model.constants");
const { mosque, user } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    payeeName: {
      type: String,
      required: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: false,
    },
    emailAddress: {
      type: String,
      required: false,
    },
    bankDetails: {
      accountNumber: {
        type: String,
      },
      bankName: {
        type: String,
      },
      ifscCode: {
        type: String,
      },
    },
    upiPhoneNumber: {
      type: String,
    },
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
  },
  { timestamps: true }
);

const PayeeRecipientModel = mongoose.model(payeeRecipient, ModelSchema);
module.exports = PayeeRecipientModel;
