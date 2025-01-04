const mongoose = require("mongoose");
const { payeeRecipient } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema({
  payeeName: {
    // Updated field name
    type: String,
    required: true,
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
});

// Export the recipient model
const PayeeRecipientModel = mongoose.model(payeeRecipient, ModelSchema);
module.exports = PayeeRecipientModel;
