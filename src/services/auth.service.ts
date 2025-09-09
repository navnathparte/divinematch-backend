import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { transporter } from "../utils/enum/mailer";

class AuthService {
  async register(
    name: string,
    email: string,
    password: string
  ): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
  }

  async login(email: string, password: string): Promise<any> {
    const user = await User.findOne({ email }).lean();
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    return { token, user };
  }

  async changePassword(
    user: any,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();
  }

  async forgotPassword(email: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetCode = resetCode;
    user.resetCodeExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    // Send code via email
    await transporter.sendMail({
      from: `"Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset Code",
      html: `<p>Your password reset code is:</p>
           <h2>${resetCode}</h2>
           <p>This code will expire in 15 minutes.</p>`,
    });

    return { success: true, message: "Reset code sent to email" };
  }

  async verifyToken(email: string, resetCode: string) {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    if (!user.resetCode || !user.resetCodeExpiry) {
      return {
        success: false,
        message: "No reset code found. Please request a new one.",
      };
    }

    if (user.resetCode !== resetCode) {
      return { success: false, message: "Invalid reset code" };
    }

    if (new Date() > user.resetCodeExpiry) {
      return { success: false, message: "Reset code has expired" };
    }

    user.resetCode = undefined;
    user.resetCodeExpiry = undefined;
    await user.save();

    return { success: true };
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return { success: true, message:"Password Updated Successfully" };
  }
}

export default AuthService;
