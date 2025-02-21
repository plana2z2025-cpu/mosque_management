const mongoose = require("mongoose");
const { payeeRecipient } = require("../../Constants/model.constants");
const { mosque, user, userMosque } = require("../../Constants/model.constants");

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
      required: true,
      refPath: "createdRef",
    },
    createdRef: {
      type: String,
      enum: [user, userMosque],
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

const PayeeRecipientModel = mongoose.model(payeeRecipient, ModelSchema);
module.exports = PayeeRecipientModel;
