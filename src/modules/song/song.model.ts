import mongoose, { Types } from 'mongoose';

const { model, Schema } = mongoose;

export interface ISong {
  artist: Types.ObjectId;
  name: string;
  uri: string;
  playlists: Types.Array<Types.ObjectId>;
}

export const SongSchema = new Schema<ISong>({
  artist: { type: Schema.Types.ObjectId, ref: 'artist', required: true },
  name: { type: String, required: true },
  uri: { type: String, required: true },
  playlists: [{ type: Schema.Types.ObjectId, ref: 'playlist', required: true }]
});

export default model<ISong>('song', SongSchema);
