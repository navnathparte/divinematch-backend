import { Router } from "express";
import ProfileController from "../controllers/profile.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const router = Router();

// Dependency injection\
const userService = new UserService();
const authService = new AuthService();
const profileController = new ProfileController(userService, authService);

// Get profile
router.get("/getProfile", AuthMiddleware.verifyToken, (req, res) =>
  profileController.getProfile(req, res)
);

// Update profile
router.put("/updateProfile", AuthMiddleware.verifyToken, (req, res) =>
  profileController.updateProfile(req, res)
);

export default router;
