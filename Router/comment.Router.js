import express from "express";
import bugCommentController from "../Controller/bug.comment.Controller.js";
import protectedRoutes from "../Middleware/protected.Routes.js";
const commentRouter = express.Router();

commentRouter.get(
  "/bug/:id/comment/list",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  bugCommentController.commentList
);

commentRouter.get(
  "/bug/:id/comment/:commentId",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  bugCommentController.findComment
);

commentRouter.put(
  "/bug/:id/comment/new",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canAddComments"),
  bugCommentController.createComment
);

export default commentRouter;
