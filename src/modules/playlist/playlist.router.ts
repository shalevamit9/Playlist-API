import express from 'express';
import playlistController from './playlist.controller.js';
import raw from '../../middleware/route.async.wrapper.js';

class PlaylistRouter {
  private readonly _router = express.Router();

  constructor() {
    this._router.get('/', raw(playlistController.getAllPlaylists));
    this._router.get('/:id', raw(playlistController.getPlaylistById));

    this._router.post('/', raw(playlistController.createPlaylist));
    this._router.post(
      '/:playlistId/song/:songId',
      raw(playlistController.addSongToPlaylist)
    );

    this._router.put('/:id', raw(playlistController.updatePlaylist));

    this._router.delete('/:id', raw(playlistController.deletePlaylist));
    this._router.delete(
      '/:playlistId/song/:songId',
      raw(playlistController.deleteSongFromPlaylist)
    );
  }

  get router() {
    return this._router;
  }
}

const playlistRouter = new PlaylistRouter();

export default playlistRouter;
