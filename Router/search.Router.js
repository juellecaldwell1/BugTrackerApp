import express from "express";
import userEndpointsController from "../Controller/user.Endpoints.Controller.js";
import bugEndpointsController from "../Controller/bug.Endpoints.Controller.js";
import protectedRoutes from "../Middleware/protected.Routes.js";

const searchRouter = express.Router();

searchRouter.get(
  "/user/list",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  userEndpointsController.SearchUserItems
);

searchRouter.get(
  "/bug/list",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  bugEndpointsController.SearchBugItems
);

export default searchRouter;
