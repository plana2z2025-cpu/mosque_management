const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { SUPPER_ADMIN, USER } = require("../Constants/roles.contants");

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
      select: false,
    },
    // profile: {
    //   public_id: {
    //     type: String,
    //   },
    //   url: {
    //     type: String,
    //     default:
    //       "https://res.cloudinary.com/dml8opujw/image/upload/v1689786795/ChatProjectMERN/ptf9embkszp4yjyput8s.png",
    //   },
    // },
    role: {
      type: String,
      default: USER,
      enum: [SUPPER_ADMIN, USER],
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

const userModel = mongoose.model("user", ModelSchema);

module.exports = userModel;
