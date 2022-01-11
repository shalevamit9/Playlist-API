import { Document } from 'mongoose';
import SongModel from '../song/song.model.js';
import { ICreateArtistDto, IUpdateArtistDto } from './artist.interface.js';
import ArtistModel, { IArtist } from './artist.model.js';

class ArtistRepository {
  async getAllArtists() {
    const artists = await ArtistModel.find();
    return artists;
  }

  async getArtistById(id: string) {
    const artist = await ArtistModel.findById(id);

    // populate typescript example
    // const artpop = await artist?.populate<{songs:(ISong & Document)[]}>('songs');
    // artpop?.songs[0].populate
    return artist;
  }

  async getSongArtist(songId: string) {
    type ArtistPopulation = {
      artist: IArtist & Document<unknown, unknown, IArtist>;
    };
    const song = await SongModel.findById(songId).populate<ArtistPopulation>(
      'artist'
    );
    if (!song) return null;

    return song.artist;
  }

  async createArtist(userDto: ICreateArtistDto) {
    const artist = await ArtistModel.create(userDto);
    return artist;
  }

  async updateArtist(id: string, userDto: IUpdateArtistDto) {
    const artist = await ArtistModel.findByIdAndUpdate(id, userDto, {
      new: true
    });
    return artist;
  }

  async deleteArtist(id: string) {
    const artist = await ArtistModel.findByIdAndDelete(id);
    return artist;
  }
}

const artistRepository = new ArtistRepository();

export default artistRepository;
