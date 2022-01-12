import PlaylistModel from './playlist.model.js';
import {
  ICreatePlaylistDto,
  IUpdatePlaylistDto
} from './playlist.interface.js';
import SongModel from '../song/song.model.js';

class PlaylistRepository {
  async getAllPlaylists() {
    const playlists = await PlaylistModel.find();
    return playlists;
  }

  async getPlaylistById(id: string) {
    const playlist = await PlaylistModel.findById(id);
    return playlist;
  }

  async createPlaylist(playlistDto: ICreatePlaylistDto) {
    const playlist = await PlaylistModel.create(playlistDto);

    const pendingSongs = playlist.songs.map(async (song) => {
      const songModel = await SongModel.findById(song._id);
      if (!songModel) return null;

      songModel.playlists.push(playlist._id);
      return await songModel.save();
    });

    await Promise.all(pendingSongs);

    return playlist;
  }

  async addSongToPlaylist(playlistId: string, songId: string) {
    const [playlist, song] = await Promise.all([
      PlaylistModel.findById(playlistId),
      SongModel.findById(songId)
    ]);
    if (!playlist || !song) return null;

    playlist.songs.push(song);
    await playlist.save();

    return playlist;
  }

  async updatePlaylist(id: string, playlistDto: IUpdatePlaylistDto) {
    const playlist = await PlaylistModel.findByIdAndUpdate(id, playlistDto, {
      new: true
    });
    return playlist;
  }

  async deletePlaylist(id: string) {
    const playlist = await PlaylistModel.findByIdAndDelete(id);
    if (!playlist) return null;

    const pending = playlist.songs.map(async (song) => {
      const songModel = await SongModel.findById(song._id);
      if (!songModel) return null;
      songModel.playlists = songModel.playlists.filter((playlistId) =>
        playlistId.equals(id)
      );
    });
    await Promise.all(pending);
    return playlist;
  }

  async deleteSongFromPlaylist(playlistId: string, songId: string) {
    const playlist = await PlaylistModel.findById(playlistId);
    if (!playlist) return null;

    playlist.songs = playlist.songs.filter((song) => song._id.equals(songId));
    await playlist.save();

    return playlist;
  }
}

const playlistRepository = new PlaylistRepository();

export default playlistRepository;
