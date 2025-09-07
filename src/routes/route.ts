import { Router } from "express";
import userRoutes from "./user.route";
import authRoutes from "./auth.route";
import profileRoutes from "./profile.route";

const router = Router();

router.use("/user", userRoutes);
router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);

export default router;
