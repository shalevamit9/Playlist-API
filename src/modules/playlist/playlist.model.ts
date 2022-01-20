import mongoose, { HydratedDocument, Types } from 'mongoose';
import { ISong, SongSchema } from '../song/song.model.js';

const { Schema, model } = mongoose;

export interface IPlaylist {
  // songs: HydratedDocument<ISong>[];
  songs: Types.Array<HydratedDocument<ISong>>;
}

export const PlaylistSchema = new Schema<IPlaylist>({
  songs: [SongSchema]
});

export default model<IPlaylist>('playlist', PlaylistSchema);
