export interface IUser {
  userId: number;
  refreshToken: string | null;
  email: string;
  password: string;
  roles: string;
}

export type ICreateUserDto = Omit<Omit<IUser, 'userId'>, 'refreshToken'>;

export type IUserWithoutPassword = Omit<IUser, 'password'>;

export type IUpdateUserDto = Partial<IUser>;
