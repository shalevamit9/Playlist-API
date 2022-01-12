import { HydratedDocument } from 'mongoose';
import SongModel from '../song/song.model.js';
import { ICreateArtistDto, IUpdateArtistDto } from './artist.interface.js';
import ArtistModel, { IArtist } from './artist.model.js';

type Artist = { artist: HydratedDocument<IArtist> };

class ArtistRepository {
  async getAllArtists() {
    const artists = await ArtistModel.find();
    return artists;
  }

  async getArtistById(id: string) {
    const artist = await ArtistModel.findById(id);
    return artist;
  }

  async getSongArtist(songId: string) {
    const song = await SongModel.findById(songId).populate<Artist>('artist');
    if (!song) return null;

    return song.artist;
  }

  async createArtist(artistDto: ICreateArtistDto) {
    const artist = await ArtistModel.create(artistDto);
    return artist;
  }

  async updateArtist(id: string, artistDto: IUpdateArtistDto) {
    const artist = await ArtistModel.findByIdAndUpdate(id, artistDto, {
      new: true
    });
    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await ArtistModel.findByIdAndDelete(id);
    if (!artist) return null;

    await Promise.all(
      artist.songs.map((songId) => SongModel.findByIdAndDelete(songId))
    );

    return artist;
  }
}

const artistRepository = new ArtistRepository();

export default artistRepository;
