import UserModel, { IUser } from "../models/User.model";

class UserService {
  async createUser(name: string, email: string): Promise<IUser> {
    const user = await UserModel.create({ name, email });
    return user;
  }

  async getUsers(): Promise<IUser[]> {
    return await UserModel.find();
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).select("-password");
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await UserModel.findByIdAndDelete(id);
  }
}

export default UserService;
