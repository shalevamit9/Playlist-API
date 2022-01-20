import mongoose, { Types } from 'mongoose';

const { model, Schema } = mongoose;

export interface IUser {
  _id: Types.ObjectId;
  refreshToken: string;
  password: string;
  email: string;
  playlists: Types.Array<Types.ObjectId>;
}

const UserSchema = new Schema<IUser>({
  refreshToken: String,
  password: String,
  email: String,
  playlists: [{ type: Schema.Types.ObjectId, ref: 'playlist', required: true }]
});

export default model<IUser>('user', UserSchema);
