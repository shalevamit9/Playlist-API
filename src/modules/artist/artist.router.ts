import express from 'express';
import artistController from './artist.controller.js';
import raw from '../../middleware/route.async.wrapper.js';

class ArtistRouter {
  private readonly _router = express.Router();

  constructor() {
    this._router.get('/', raw(artistController.getAllArtists));
    this._router.get('/:id', raw(artistController.getArtistById));
    this._router.get('/song/:id', raw(artistController.getSongArtist));

    this._router.post('/', raw(artistController.createArtist));

    this._router.put('/:id', raw(artistController.updateArtist));

    this._router.delete('/:id', raw(artistController.deleteArtist));
  }

  get router() {
    return this._router;
  }
}

const artistRouter = new ArtistRouter();

export default artistRouter;
