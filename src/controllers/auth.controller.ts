import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.service";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

class AuthController {
  constructor(private authService: AuthService) {}

  async test(req: any, res: Response) {
    try {
      res.status(200).json({ message: "auth test successfully" });
    } catch (error: any) {
      res
        .status(400)
        .json({ error: "Registration failed", message: error.message });
    }
  }

  async register(req: any, res: Response) {
    try {
      const { username: name, email, password } = req.body;
      console.log({ body: req.body });

      const user = await this.authService.register(name, email, password);
      res
        .status(201)
        .json({ message: "User registered successfully", data: user });
    } catch (error) {
      res.status(400).json({ error: "Registration failed" });
    }
  }

  async login(req: any, res: Response) {
    try {
      const { email, password } = req.body;
      console.log("req.body", req.body);
      const { token, user } = await this.authService.login(email, password);
      if (!token) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: "Login failed" });
    }
  }

  auth(req: any, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default_secret"
      ) as JwtPayload;
      (req as any).user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);
      res.json({ message: "Password reset code sent to email" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async verifyToken(req: Request, res: Response) {
    try {
      const { email, resetCode } = req.body;

      if (!email || !resetCode) {
        return res
          .status(400)
          .json({ error: "Email and reset code are required" });
      }

      const result = await this.authService.verifyToken(email, resetCode);

      if (!result.success) {
        return res.status(400).json({ error: result.message });
      }

      res.json({ message: "Code verified successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Server error" });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;

      if (!email || !newPassword) {
        return res
          .status(400)
          .json({ error: "Email, reset code and new password are required" });
      }

      const result = await this.authService.resetPassword(email, newPassword);

      if (!result.success) {
        return res.status(400).json({ error: result.message });
      }

      res.json({ message: "Password reset successful" });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Server error" });
    }
  }
}

export default AuthController;
