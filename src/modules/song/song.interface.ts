interface ISongDto {
  _id: string;
  name: string;
  artist: string;
  uri: string;
}

export type ICreateSongDto = Omit<ISongDto, '_id'>;

export type IUpdateSongDto = Partial<ICreateSongDto>;
