export interface ISong {
  songId: number;
  name: string;
  uri: string;
  artistId: number;
  statusId: number;
}

export type ICreateSongDto = Omit<ISong, 'songId'>;

export type IUpdateSongDto = Partial<ICreateSongDto>;
