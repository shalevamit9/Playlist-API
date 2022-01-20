import { ICreateUserDto, IUpdateUserDto } from './user.interface.js';
import UserModel from './user.model.js';

class UserRepository {
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async getUserById(id: string) {
    const user = await UserModel.findById(id);
    return user;
  }

  async createUser(userDto: ICreateUserDto) {
    const user = await UserModel.create(userDto);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  async updateUser(id: string, userDto: IUpdateUserDto) {
    const user = await UserModel.findByIdAndUpdate(id, userDto, {
      new: true
    });
    return user;
  }
}

const userRepository = new UserRepository();

export default userRepository;
