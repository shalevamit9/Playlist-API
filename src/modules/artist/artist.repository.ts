import { db } from '../../db/mysql.connection.js';
import {
  IArtist,
  ICreateArtistDto,
  IUpdateArtistDto
} from './artist.interface.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

class ArtistRepository {
  async getAllArtists() {
    const [artists] = await db.query('SELECT * FROM artists');
    return artists as IArtist[];
  }

  async getArtistById(id: string | number) {
    const [artists] = (await db.query(
      'SELECT * FROM artists WHERE artistId = ?',
      id
    )) as RowDataPacket[][];

    return artists[0] as IArtist;
  }

  async getSongArtist(songId: string | number) {
    const [artists] = (await db.query(
      'SELECT * FROM artists WHERE artistId = (SELECT artistId FROM songs WHERE songId = ?)',
      songId
    )) as RowDataPacket[][];

    return artists[0] as IArtist;
  }

  async createArtist(artistDto: ICreateArtistDto) {
    artistDto.statusId = 1;
    const [result] = (await db.query(
      'INSERT INTO artists SET ?',
      artistDto
    )) as ResultSetHeader[];

    const artist = await this.getArtistById(result.insertId);
    return artist;
  }

  async updateArtist(id: string | number, artistDto: IUpdateArtistDto) {
    const [result] = (await db.query(
      'UPDATE artists SET ? WHERE artistId = ?',
      [artistDto, id]
    )) as ResultSetHeader[];
    return !!result.affectedRows && (await this.getArtistById(id));
  }

  async deleteArtist(id: string | number) {
    const artist = await this.getArtistById(id);
    const [result] = (await db.query(
      'DELETE FROM artists WHERE artistId = ?',
      id
    )) as ResultSetHeader[];
    return !!result.affectedRows && artist;
  }
}

const artistRepository = new ArtistRepository();

export default artistRepository;
