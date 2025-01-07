const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  SUPPER_ADMIN,
  USER,
  MEMBER,
  ADMIN,
} = require("../../Constants/roles.constants");
const { user, mosque } = require("../../Constants/model.constants");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: USER,
      enum: [SUPPER_ADMIN, ADMIN, MEMBER, USER],
    },
    mosque_admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: mosque,
    },
    isVerified: {
      type: Boolean,
      default: false,
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

const userModel = mongoose.model(user, ModelSchema);

module.exports = userModel;
