/* eslint-disable @typescript-eslint/no-unused-vars */
import { RowDataPacket, ResultSetHeader } from 'mysql2';
import {
  IPlaylist,
  ICreatePlaylistDto,
  IUpdatePlaylistDto
} from './playlist.interface.js';
import { db } from '../../db/mysql.connection.js';
import { ISong } from '../song/song.interface.js';

type PlaylistWithSongs = IPlaylist & ISong;

class PlaylistRepository {
  async getAllPlaylists() {
    const [playlists] = await db.query('SELECT * FROM playlists');
    return playlists as IPlaylist[];
  }

  async getAllPlaylistsWithSongs() {
    const [playlists] = await db.query(
      `SELECT * 
      FROM playlists AS p 
      JOIN songsPlaylists AS sp ON p.playlistId = s.playlistId
      JOIN songs AS s ON sp.songId = sp.songId`
    );
    return playlists as PlaylistWithSongs[];
  }

  async getPlaylistById(id: string | number) {
    const [playlists] = (await db.query(
      `SELECT *
      FROM playlists AS p 
      JOIN songsPlaylists AS sp ON p.playlistId = s.playlistId
      JOIN songs AS s ON sp.songId = sp.songId
      WHERE playlistId = ?`,
      id
    )) as RowDataPacket[][];
    return playlists[0] as PlaylistWithSongs;
  }

  async createPlaylist(playlistDto: ICreatePlaylistDto) {
    const [result] = (await db.query(
      'INSERT INTO playlists SET ?',
      playlistDto
    )) as ResultSetHeader[];

    const playlist = await this.getPlaylistById(result.insertId);
    return playlist;
  }

  async addSongToPlaylist(
    playlistId: string | number,
    songId: string | number
  ) {
    const pendingInsert = db.query('INSERT INTO songsPlaylists SET ?', {
      playlistId,
      songId
    });
    const [playlist] = await Promise.all([
      this.getPlaylistById(playlistId),
      pendingInsert
    ]);

    return playlist;
  }

  async updatePlaylist(id: string | number, playlistDto: IUpdatePlaylistDto) {
    const pendingUpdate = db.query(
      'UPDATE playlists SET ? WHERE playlistId = ?',
      [playlistDto, id]
    );
    const [playlist] = await Promise.all([
      this.getPlaylistById(id),
      pendingUpdate
    ]);

    return playlist;
  }

  async deletePlaylist(id: string | number) {
    const playlist = await this.getPlaylistById(id);
    const [result] = (await db.query(
      'DELETE FROM playlists WHERE playlistId = ?',
      id
    )) as ResultSetHeader[];

    return !!result.affectedRows && playlist;
  }

  async deleteSongFromPlaylist(
    playlistId: string | number,
    songId: string | number
  ) {
    const playlist = await this.getPlaylistById(playlistId);
    const [result] = (await db.query(
      'DELETE FROM songsPlaylists WHERE playlistId = ? AND songId = ',
      [playlistId, songId]
    )) as ResultSetHeader[];

    return !!result.affectedRows && playlist;
  }
}

const playlistRepository = new PlaylistRepository();

export default playlistRepository;
