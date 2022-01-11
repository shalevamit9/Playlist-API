import { ICreateArtistDto, IUpdateArtistDto } from './artist.interface.js';
import artistRepository from './artist.repository.js';

class ArtistService {
  async getAllArtists() {
    const artists = await artistRepository.getAllArtists();
    return artists;
  }

  async getArtistById(id: string) {
    const artist = await artistRepository.getArtistById(id);
    return artist;
  }

  async getSongArtist(songId: string) {
    const artist = await artistRepository.getSongArtist(songId);
    return artist;
  }

  async createArtist(artistDto: ICreateArtistDto) {
    const artist = await artistRepository.createArtist(artistDto);
    return artist;
  }

  async updateArtist(id: string, artistDto: IUpdateArtistDto) {
    const artist = await artistRepository.updateArtist(id, artistDto);
    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await artistRepository.deleteArtist(id);
    return artist;
  }
}

const artistService = new ArtistService();

export default artistService;
