import { ISong, ICreateSongDto, IUpdateSongDto } from './song.interface.js';
import { db } from '../../db/mysql.connection.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

class SongRepository {
  async getAllSongs() {
    const [songs] = await db.query('SELECT * FROM songs;');
    return songs as ISong[];
  }

  async getSongById(id: string | number) {
    const [songs] = (await db.query(
      'SELECT * FROM songs WHERE songId = ?;',
      id
    )) as RowDataPacket[][];

    return songs[0] as ISong;
  }

  async getArtistSongs(artistId: string | number) {
    const [songs] = await db.query(
      'SELECT * FROM songs WHERE artistId = ?;',
      artistId
    );

    return songs as ISong[];
  }

  async createSong(songDto: ICreateSongDto) {
    songDto.statusId = 1;
    const [result] = (await db.query(
      'INSERT INTO songs SET ?;',
      songDto
    )) as ResultSetHeader[];

    const song = await this.getSongById(result.insertId);
    return song;
  }

  async updateSong(id: string | number, songDto: IUpdateSongDto) {
    await db.query('UPDATE songs SET ? WHERE songId = ?;', [songDto, id]);
    const song = await this.getSongById(id);
    return song;
  }

  async deleteSong(id: string | number) {
    const pendingSong = this.getSongById(id);

    // const payload = { songId: id };
    // await db.query('DELETE FROM songsPlaylists WHERE ?;', payload);
    // await db.query('DELETE FROM songs WHERE ?;', payload);
    await db.query('DELETE FROM songsPlaylists WHERE songId = ?;', id);
    await db.query('DELETE FROM songs WHERE songId = ?;', id);

    const song = await pendingSong;
    return song;
  }

  async deleteArtistSongs(artistId: string | number) {
    const songs = await this.getArtistSongs(artistId);
    const pending = songs.map((song) => this.deleteSong(song.songId));

    return await Promise.all(pending);
  }
}

const songRepository = new SongRepository();

export default songRepository;
