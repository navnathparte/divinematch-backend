import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default class ProfileController {
  constructor(
    private userService = new UserService(),
    private authService = new AuthService()
  ) {}

  async getProfile(req: any, res: any): Promise<any> {
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
  }

  async updateProfile(req: any, res: any): Promise<any> {
    try {
      const { name, bio } = req.body;
      const userDetails = req.user;
      const user = await this.userService.updateUser(userDetails.id, {
        name,
        bio,
      });

      res.json({
        message: "success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }
}
