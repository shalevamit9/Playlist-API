export interface IPlaylist {
  playlistId: number;
  userId: number;
  name: string;
}

export type ICreatePlaylistDto = Omit<IPlaylist, 'playlistId'>;

export type IUpdatePlaylistDto = Partial<ICreatePlaylistDto>;
