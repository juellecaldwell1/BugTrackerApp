import express from "express";
import bugTestCasesController from "../Controller/bug.testCases.Controller.js";
import protectedRoutes from "../Middleware/protected.Routes.js";
const testRouter = express.Router();

testRouter.get(
  "/bug/:bugId/test/list",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  bugTestCasesController.testCasesList
);

testRouter.get(
  "/bug/:bugId/test/:testId",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  bugTestCasesController.findTestCase
);
 
testRouter.put(
  "/bug/:bugId/test/new",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canAddTestCase"),
  bugTestCasesController.createTestCase
);

testRouter.put(
  "/bug/:bugId/test/:testId",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canEditTestCase"),
  bugTestCasesController.updateTestId
);

testRouter.delete(
  "/bug/:bugId/test/:testId",
  protectedRoutes.verifyRefreshToken,
  protectedRoutes.protectRoute,
  protectedRoutes.CheckRoles("canDeleteTestCase"),
  bugTestCasesController.deleteTestCase
);

export default testRouter;
