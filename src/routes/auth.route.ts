import { Router } from "express";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.get("/test", authController.test);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verify-token", authController.verifyToken);
router.post("/reset-password", authController.resetPassword);

export default router;
