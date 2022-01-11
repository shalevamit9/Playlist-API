import express from 'express';
import songController from './song.controller.js';
import raw from '../../middleware/route.async.wrapper.js';

class SongRouter {
  private readonly _router = express.Router();

  constructor() {
    this._router.get('/', raw(songController.getAllSongs));
    this._router.get('/:id', raw(songController.getSongById));
    this._router.get('/artist/:id', raw(songController.getArtistSongs));

    this._router.post('/', raw(songController.createSong));

    this._router.put('/:id', raw(songController.updateSong));

    this._router.delete('/:id', raw(songController.deleteSong));
  }

  get router() {
    return this._router;
  }
}

const songRouter = new SongRouter();

export default songRouter;
