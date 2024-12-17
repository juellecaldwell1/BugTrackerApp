import express from "express";
import protectedRoutes from "../Middleware/protected.Routes.js";
import userController from "../Controller/user.Controller.js";

const router = express.Router();

router.get(
  "/user/list",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canViewData"),
  userController.userList
);

router.get(
  "/user/:id",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canViewData"),
  userController.userId
);

router.post("/user/register", userController.postUser);

router.put(
  "/user/:id",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canEditAnyUser"),
  userController.updateUser
);

router.delete(
  "/user/:id",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canEditAnyUser"),
  userController.deleteUser
);

export default router;
