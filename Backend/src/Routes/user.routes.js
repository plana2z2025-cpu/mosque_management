const express = require("express");
const {
  RegisterController,
  LoginUserController,
  MyProfileController,
} = require("../Controllers/user.controller");
const { Authentication } = require("../Middlewares/Auth.middleware");

const UserRoutes = express.Router();

UserRoutes.route("/login").post(LoginUserController);

UserRoutes.route("/register").post(RegisterController);

UserRoutes.route("/profile").get(Authentication, MyProfileController);

module.exports = UserRoutes;
