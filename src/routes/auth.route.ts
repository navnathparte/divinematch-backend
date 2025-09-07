import { Router } from "express";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";

const router = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

router.get("/test", (req, res) => authController.test(req, res));
router.post("/register", (req, res) => authController.register(req, res));
router.post("/login", (req, res) => authController.login(req, res));

export default router;
