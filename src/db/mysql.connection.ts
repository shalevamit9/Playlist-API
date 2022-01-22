import mysql from 'mysql2/promise';
import log from '@ajar/marker';

export let db: mysql.Connection;

export const connectDb = async (connectionOpts: mysql.ConnectionOptions) => {
  db = await mysql.createConnection(connectionOpts);
  log.magenta(' ✨  Connected to MySQL ✨ ');
};
