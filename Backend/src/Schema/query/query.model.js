const mongoose = require("mongoose");
const { userMosque, queries } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "religious",
      "administrative",
      "financial",
      "facility",
      "events",
      "other",
    ],
    required: true,
  },
  submittedBy: {
    name: { type: String, lowercase: true, required: true },
    email: { type: String },
    phone: { type: String },
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "answered", "closed"],
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userMosque,
  },
  responseContent: {
    content: String,
    respondedBy: { type: Schema.Types.ObjectId, ref: "Staff" },
    respondedAt: Date,
  },

  respondedRef: {
    type: String,
    enum: [user, userMosque],
    required: true,
  },
  respondedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "respondedRef",
  },
  respondedAt: {
    type: Date,
  },
  attachments: [
    {
      fileName: String,
      fileType: String,
      fileUrl: String,
    },
  ],
  tags: [String],
});

const queryModel = mongoose.model(queries, ModelSchema);
module.exports = queryModel;
