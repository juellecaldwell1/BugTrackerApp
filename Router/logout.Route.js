import express from "express";
import protectedRoutes from "../Middleware/protected.Routes.js";
import userController from "../Controller/user.Controller.js";
import logoutController from "../Controller/logout.Controller.js";

const logout = express.Router();

logout.post(
  "/user/logout",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  logoutController
);

export default logout;
