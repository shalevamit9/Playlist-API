// import bcrypt from 'bcryptjs';
// import { ICreateUserDto } from './user.interface.js';
import userRepository from './user.repository.js';

class UserService {
  async getAllUsers() {
    const users = await userRepository.getAllUsers();
    return users;
  }

  async getUserById(id: string) {
    const user = await userRepository.getUserById(id);
    return user;
  }
}

const userService = new UserService();

export default userService;
