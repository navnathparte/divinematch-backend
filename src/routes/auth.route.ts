import { Router } from "express";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.get("/test", (req, res) => authController.test(req, res));
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.post("/forgotPassword", (req, res) =>
  authController.forgotPassword(req, res)
);
router.post("/verify-token", (req, res) =>
  authController.verifyToken(req, res)
);
router.post("/reset-password", (req, res) =>
  authController.resetPassword(req, res)
);

export default router;
