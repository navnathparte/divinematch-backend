import UserModel, { IUser } from "../models/user.model";

class UserService {
  createUser = async (name: string, email: string): Promise<IUser> => {
    const user = await UserModel.create({ name, email });
    return user;
  };

  getUsers = async (): Promise<IUser[]> => {
    return await UserModel.find();
  };

  getUserById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id);
  };

  updateUser = async (
    id: string,
    data: Partial<IUser>
  ): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).select(
      "-password"
    );
  };

  deleteUser = async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
  };
}

export default UserService;
