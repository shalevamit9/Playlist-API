import {
  ICreatePlaylistDto,
  IUpdatePlaylistDto
} from './playlist.interface.js';
import playlistRepository from './playlist.repository.js';

class PlaylistService {
  async getAllPlaylists() {
    const playlists = await playlistRepository.getAllPlaylists();
    return playlists;
  }

  async getPlaylistById(id: string) {
    const playlist = await playlistRepository.getPlaylistById(id);
    return playlist;
  }

  async createPlaylist(playlistDto: ICreatePlaylistDto) {
    const playlist = await playlistRepository.createPlaylist(playlistDto);
    return playlist;
  }

  async addSongToPlaylist(playlistId: string, songId: string) {
    const playlist = await playlistRepository.addSongToPlaylist(
      playlistId,
      songId
    );
    return playlist;
  }

  async updatePlaylist(id: string, playlistDto: IUpdatePlaylistDto) {
    const playlist = await playlistRepository.updatePlaylist(id, playlistDto);
    return playlist;
  }

  async deletePlaylist(id: string) {
    const playlist = await playlistRepository.deletePlaylist(id);
    return playlist;
  }

  async deleteSongFromPlaylist(playlistId: string, songId: string) {
    const playlist = await playlistRepository.deleteSongFromPlaylist(
      playlistId,
      songId
    );
    return playlist;
  }
}

const playlistService = new PlaylistService();

export default playlistService;
