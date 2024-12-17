import express from "express";
import login from "../Controller/login.Controller.js";
import userProfileController from "../Controller/user.Profile.Controller.js";
import protectedRoutes from "../Middleware/protected.Routes.js";
const profileRouter = express.Router();

profileRouter.get(
  "/user/me",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  userProfileController.userProfile
);

profileRouter.put(
  "/user/me",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  userProfileController.updateUserProfile
);

export default profileRouter;
