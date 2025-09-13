import { Router } from "express";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Dependency injection
const userService = new UserService();
const userController = new UserController(userService);

router.get("/profile", AuthMiddleware.verifyToken, userController.getProfile);

router.put(
  "/profile",
  AuthMiddleware.verifyToken,
  userController.updateProfile
);

router.put(
  "/profile/password",
  AuthMiddleware.verifyToken,
  userController.changePassword
);

export default router;
