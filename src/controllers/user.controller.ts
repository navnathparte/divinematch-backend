import { Response } from "express";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default class UserController {
  constructor(
    private userService = new UserService(),
    private authService = new AuthService()
  ) {}

  getUsers = async (req: any, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUsers();
      res.json({ message: "successfully Users fetched!!!", data: users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

  getProfile = async (req: any, res: Response): Promise<void> => {
    try {
      const userDetails = req.user;
      const user = await this.userService.getUserById(userDetails.id);
      if (!user) {
        res.status(404).json({ error: "User profile not found" });
        return;
      }
      res.json({
        message: "successful",
        user: {
          id: user._id,
          username: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  };

  updateProfile = async (req: any, res: Response): Promise<void> => {
    try {
      const { name, bio } = req.body;
      const userDetails = req.user;
      const user = await this.userService.updateUser(userDetails.id, {
        name,
        bio,
      });

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };

  async changePassword(req: any, res: Response): Promise<any> {
    try {
      const userDetails = req.user;
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        res.status(400).json({ msg: "Both old and new password required" });
      }

      const user = await this.userService.getUserById(userDetails.id);
      if (!user) {
        res.status(404).json({ error: "User profile not found" });
        return;
      }

      await this.authService.changePassword(user, oldPassword, newPassword);

      res.json({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to Password updated" });
    }
  }

  getUserById = async (req: any, res: Response): Promise<void> => {
    try {
      const user = await this.userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  };

  updateUser = async (req: any, res: Response): Promise<void> => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update user" });
    }
  };

  deleteUser = async (req: any, res: Response): Promise<void> => {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  };
}
