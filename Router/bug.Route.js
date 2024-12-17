import express from "express";
import bugController from "../Controller/bug.Controller.js";
import protectedRoutes from "../Middleware/protected.Routes.js";
const bRouter = express.Router();

bRouter.get(
  "/bug/list",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canViewData"),
  bugController.getBugs
);

bRouter.get(
  "/bug/:id",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canViewData"),
  bugController.findBugByID,
);

bRouter.post(
  "/bug/new",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canCreateBug"),
  bugController.postBug
);

bRouter.put(
  "/bug/:id",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canEditAnyBug"),
  protectedRoutes.CheckRoles("canEditIfAssignedTo"),
  protectedRoutes.CheckRoles("canEditMyBug"),
  bugController.updateBugsData
);

bRouter.put(
  "/bug/:id/classify",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canClassifyAnyBug"),
  protectedRoutes.CheckRoles("canEditIfAssignedTo"),
  protectedRoutes.CheckRoles("canEditMyBug"),
  bugController.classifyBug
);

bRouter.put(
  "/bug/:id/assign",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canReassignAnyBug"),
  protectedRoutes.CheckRoles("canEditIfAssignedTo"),
  protectedRoutes.CheckRoles("canEditMyBug"),
  bugController.bugAssign
);

bRouter.put(
  "/bug/:id/close",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canCloseAnyBug"),
  bugController.bugClose
);

bRouter.delete(
  "/bug/:id",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("Technical Manager"),
  bugController.deleteBug
)

bRouter.put(
  "/bug/:id/steps",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canEditAnyBug"),
  bugController.stepsToFix
)

bRouter.put(
  "/bug/:id/time",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  bugController.logHours
)

export default bRouter;
