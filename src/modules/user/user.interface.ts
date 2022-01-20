interface IUserDto {
  _id: string;
  refreshToken: string | null;
  email: string;
  password: string;
  playlists: string[];
}

export type ICreateUserDto = Omit<Omit<IUserDto, '_id'>, 'refreshToken'>;

export type IUserWithoutPassword = Omit<IUserDto, 'password'>;

export type IUpdateUserDto = Partial<IUserDto>;
