import { RowDataPacket, ResultSetHeader } from 'mysql2';
import { db } from '../../db/mysql.connection.js';
import { IUser, ICreateUserDto, IUpdateUserDto } from './user.interface.js';

class UserRepository {
  async getAllUsers() {
    const [users] = await db.query('SELECT * FROM users');
    return users as IUser[];
  }

  async getUserById(id: string | number) {
    const [users] = (await db.query(
      'SELECT * FROM users WHERE userId = ?',
      id
    )) as RowDataPacket[][];
    return users[0] as IUser;
  }

  async createUser(userDto: ICreateUserDto) {
    const [result] = (await db.query(
      'INSERT INTO users SET ?',
      userDto
    )) as ResultSetHeader[];

    const user = await this.getUserById(result.insertId);
    return user;
  }

  async getUserByEmail(email: string) {
    const [users] = (await db.query(
      'SELECT * FROM users WHERE email = ?',
      email
    )) as RowDataPacket[][];
    return users[0] as IUser;
  }

  async updateUser(id: string | number, userDto: IUpdateUserDto) {
    await db.query('UPDATE users SET ? WHERE userId = ?', [userDto, id]);
    const user = await this.getUserById(id);
    return user;
  }

  async deleteUser(id: string | number) {
    // first option
    await db.query('DELETE FROM playlists WHERE userId = ?', id);
    const user = await this.getUserById(id);
    const [result] = (await db.query(
      'DELETE FROM users WHERE userId = ?',
      id
    )) as ResultSetHeader[];

    return !!result.affectedRows && user;

    // second option
    // await db.query('DELETE FROM playlists WHERE userId = ?', id);
    // const user = await this.getUserById(id);
    // await db.query('DELETE FROM users WHERE userId = ?', id);

    // return user;
  }
}

const userRepository = new UserRepository();

export default userRepository;
