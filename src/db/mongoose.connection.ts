import mongoose from 'mongoose';
import log from '@ajar/marker';

export const connectDb = async (uri: string) => {
  await mongoose.connect(uri);
  log.magenta(' ✨  Connected to Mongo DB ✨ ');
};
