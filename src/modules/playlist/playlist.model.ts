import mongoose, { HydratedDocument } from 'mongoose';
import { ISong, SongSchema } from '../song/song.model.js';

const { Schema, model } = mongoose;

interface IPlaylist {
  songs: HydratedDocument<ISong>[];
}

export const PlaylistSchema = new Schema<IPlaylist>({
  songs: [SongSchema]
});

export default model<IPlaylist>('song', PlaylistSchema);
