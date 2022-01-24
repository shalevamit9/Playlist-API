export interface IPlaylist {
  playlistId: number;
  userId: number;
  playlistName: string;
}

export type ICreatePlaylistDto = Omit<IPlaylist, 'playlistId'>;

export type IUpdatePlaylistDto = Partial<ICreatePlaylistDto>;
