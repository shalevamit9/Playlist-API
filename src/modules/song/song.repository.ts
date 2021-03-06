import SongModel, { ISong } from './song.model.js';
import ArtistModel from '../artist/artist.model.js';
import PlaylistModel from '../playlist/playlist.model.js';
import { ICreateSongDto, IUpdateSongDto } from './song.interface.js';
import { HydratedDocument } from 'mongoose';

type Songs = { songs: HydratedDocument<ISong>[] };

class SongRepository {
  async getAllSongs() {
    const songs = await SongModel.find();
    return songs;
  }

  async getSongById(id: string) {
    const song = await SongModel.findById(id);
    return song;
  }

  async getArtistSongs(artistId: string) {
    const artist = await ArtistModel.findById(artistId).populate<Songs>(
      'songs'
    );
    if (!artist) return null;

    return artist.songs;
  }

  async createSong(songDto: ICreateSongDto) {
    const artist = await ArtistModel.findById(songDto.artist);
    if (!artist) return null;
    const song = await SongModel.create(songDto);

    artist.songs.push(song._id);
    await artist.save();
    return song;
  }

  async updateSong(id: string, songDto: IUpdateSongDto) {
    const song = await SongModel.findByIdAndUpdate(id, songDto, {
      new: true
    });
    if (!song) return null;

    const playlists = await Promise.all(
      song.playlists.map((playlistId) => PlaylistModel.findById(playlistId))
    );
    const pending = playlists.map((playlist) => {
      if (!playlist) return null;

      const songIndex = playlist.songs.findIndex((song) => song._id.equals(id));
      playlist.songs[songIndex] = song;

      return playlist.save();
    });

    await Promise.all(pending);

    return song;
  }

  async deleteSong(id: string) {
    const deletedSong = await SongModel.findByIdAndDelete(id);
    if (!deletedSong) return null;

    const artist = await ArtistModel.findById(deletedSong.artist);
    if (!artist) return null;
    artist.songs = artist.songs.filter((songId) => !songId.equals(id));

    const playlists = await PlaylistModel.find();
    playlists.forEach((playlist) => {
      // playlist.songs = playlist.songs.filter((song) => !song._id.equals(id));
      playlist.songs.pull(id);
    });

    await Promise.all(playlists.map((playlist) => playlist.save()));
    await artist.save();

    return deletedSong;
  }
}

const songRepository = new SongRepository();

export default songRepository;
