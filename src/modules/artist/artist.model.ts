import mongoose, { Types } from 'mongoose';

const { model, Schema } = mongoose;

export interface IArtist {
  firstName: string;
  lastName: string;
  songs: Types.ObjectId[];
}

export const ArtistSchema = new Schema<IArtist>({
  firstName: String,
  lastName: String,
  songs: [{ type: Schema.Types.ObjectId, ref: 'song' }]
});

export default model<IArtist>('artist', ArtistSchema);
