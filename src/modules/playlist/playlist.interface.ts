import { ISong } from '../song/song.model';

interface IPlaylistDto {
  _id: string;
  songs: ISong[];
}

export type ICreatePlaylistDto = Omit<IPlaylistDto, '_id'>;

export type IUpdatePlaylistDto = Partial<ICreatePlaylistDto>;
