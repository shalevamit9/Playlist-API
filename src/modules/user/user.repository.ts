import { ICreateUserDto, IUpdateUserDto } from './user.interface.js';
import UserModel from './user.model.js';

class UserRepository {
  async getAllUsers() {
    // const projection = [
    //   {
    //     $project: {
    //       userId: '$_id',
    //       _id: 0,
    //       refreshToken: 1,
    //       email: 1,
    //       playlists: 1
    //     }
    //   }
    // ];
    // const users = await UserModel.aggregate(projection);
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
