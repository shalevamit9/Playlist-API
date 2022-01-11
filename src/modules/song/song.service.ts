import { ICreateSongDto, IUpdateSongDto } from './song.interface.js';
import songRepository from './song.repository.js';

class SongService {
  async getAllSongs() {
    const songs = await songRepository.getAllSongs();
    return songs;
  }

  async getSongById(id: string) {
    const song = await songRepository.getSongById(id);
    return song;
  }

  async getArtistSongs(artistId: string) {
    const songs = await songRepository.getArtistSongs(artistId);
    return songs;
  }

  async createSong(songDto: ICreateSongDto) {
    const song = await songRepository.createSong(songDto);
    return song;
  }

  async updateSong(id: string, songDto: IUpdateSongDto) {
    const song = await songRepository.updateSong(id, songDto);
    return song;
  }

  async deleteSong(id: string) {
    const song = await songRepository.deleteSong(id);
    return song;
  }
}

const songService = new SongService();

export default songService;
