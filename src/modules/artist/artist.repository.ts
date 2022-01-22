import { db } from '../../db/mysql.connection.js';
import { ICreateArtistDto, IUpdateArtistDto } from './artist.interface.js';
import { IArtist } from './artist.interface.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

class ArtistRepository {
  async getAllArtists() {
    const [artists] = await db.query('SELECT * FROM artists;');
    return artists as IArtist[];
  }

  async getArtistById(id: string) {
    const [artists] = (await db.query(
      'SELECT * FROM artists WHERE artistId = ?;',
      id
    )) as RowDataPacket[][];

    return artists[0] as IArtist;
  }

  async getSongArtist(songId: string) {
    const [artists] = (await db.query(
      'SELECT * FROM artists WHERE artistId = (SELECT artistId FROM songs WHERE songId = ?);',
      songId
    )) as RowDataPacket[][];

    return artists[0] as IArtist;
  }

  async createArtist(artistDto: ICreateArtistDto) {
    artistDto.statusId = 1;
    const [result] = (await db.query(
      'INSERT INTO artists SET ?;',
      artistDto
    )) as ResultSetHeader[];

    const artist = await this.getArtistById(result.insertId.toString());
    return artist;
  }

  async updateArtist(id: string, artistDto: IUpdateArtistDto) {
    await db.query('UPDATE artists SET ? WHERE artistId = ?;', [artistDto, id]);
    const artist = this.getArtistById(id);
    return artist;
  }

  async deleteArtist(id: string) {
    const pendingArtist = this.getArtistById(id);
    await db.query('DELETE FROM songs WHERE artistId = ?;', id);
    await db.query('DELETE FROM artists WHERE artistId = ?;', id);

    const artist = await pendingArtist;
    return artist;
  }
}

const artistRepository = new ArtistRepository();

export default artistRepository;
