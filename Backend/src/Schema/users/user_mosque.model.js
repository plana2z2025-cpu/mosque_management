const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { userMosque, user, mosque } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    rootUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: mosque,
    },
    mosqueUniqueId: {
      type: String,
      required: true,
    },
    permissions: {
      read: {
        type: Boolean,
        default: true,
      },
      write: {
        type: Boolean,
        default: true,
      },
      update: {
        type: Boolean,
        default: false,
      },
      delete: {
        type: Boolean,
        default: false,
      },
    },
    createdRef: {
      type: String,
      enum: [user, userMosque],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: user,
      required: true,
    },
    updatedRef: {
      type: String,
      enum: [user, userMosque],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "updatedRef",
    },
  },
  { timestamps: true }
);

ModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const userMosqueModel = mongoose.model(userMosque, ModelSchema);

module.exports = userMosqueModel;
