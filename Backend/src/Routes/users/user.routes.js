const express = require("express");
const {
  RegisterController,
  LoginUserController,
  LoginSubUserController,
  MyProfileController,
} = require("../../Controllers/users/user.controller");
const { Authentication } = require("../../Middlewares/Auth.middleware");
const {
  RegisterUserValidation,
  LoginUserValidation,
  LoginSubUserValidation,
} = require("../../validators/user.joi");

const UserRoutes = express.Router();

UserRoutes.route("/login").post(LoginUserValidation, LoginUserController);
UserRoutes.route("/login/sub-user").post(
  LoginSubUserValidation,
  LoginSubUserController
);
// UserRoutes.route("/register").post(RegisterUserValidation, RegisterController);
UserRoutes.route("/profile").get(Authentication, MyProfileController);

module.exports = UserRoutes;
