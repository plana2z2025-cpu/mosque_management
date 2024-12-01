const express = require("express");
const {
  RegisterController,
  LoginUserController,
  MyProfileController,
} = require("../../Controllers/users/user.controller");
const { Authentication } = require("../../Middlewares/Auth.middleware");
const {
  RegisterUserValidation,
  LoginUserValidation,
} = require("../../validators/user.joi");

const UserRoutes = express.Router();

UserRoutes.route("/login").post(LoginUserValidation, LoginUserController);
// UserRoutes.route("/register").post(RegisterUserValidation, RegisterController);
UserRoutes.route("/profile").get(Authentication, MyProfileController);

module.exports = UserRoutes;
