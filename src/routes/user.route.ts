import { Router } from "express";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Dependency injection
const userService = new UserService();
const userController = new UserController(userService);

router.get("/profile", AuthMiddleware.verifyToken, (req, res) =>
  userController.getProfile(req, res)
);

router.put("/profile", AuthMiddleware.verifyToken, (req, res) =>
  userController.updateProfile(req, res)
);

router.put("/profile/password", AuthMiddleware.verifyToken, (req, res) =>
  userController.changePassword(req, res)
);

export default router;
