import { RequestHandler } from 'express';
import { UrlNotFoundException } from '../../exceptions/urlNotFound.exception.js';
import { ResponseMessage } from '../../types/messages.interface.js';
import {
  ICreatePlaylistDto,
  IUpdatePlaylistDto
} from './playlist.interface.js';
import playlistService from './playlist.service.js';

class PlaylistController {
  getAllPlaylists: RequestHandler = async (req, res) => {
    const playlists = await playlistService.getAllPlaylists();

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { playlists }
    };

    res.status(response.status).json(response);
  };

  getPlaylistById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const playlist = await playlistService.getPlaylistById(id);
    if (!playlist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { playlist }
    };

    res.status(response.status).json(response);
  };

  createPlaylist: RequestHandler = async (req, res) => {
    const playlistDto: ICreatePlaylistDto = req.body;
    const playlist = await playlistService.createPlaylist(playlistDto);

    const response: ResponseMessage = {
      status: 201,
      message: 'success',
      data: { playlist }
    };

    res.status(response.status).json(response);
  };

  addSongToPlaylist: RequestHandler = async (req, res, next) => {
    const { playlistId, songId } = req.params;
    const playlist = await playlistService.addSongToPlaylist(
      playlistId,
      songId
    );
    if (!playlist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { playlist }
    };

    res.status(response.status).json(response);
  };

  updatePlaylist: RequestHandler = async (req, res, next) => {
    const playlistDto: IUpdatePlaylistDto = req.body;
    const { id } = req.params;

    const playlist = await playlistService.updatePlaylist(id, playlistDto);
    if (!playlist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { playlist }
    };

    res.status(response.status).json(response);
  };

  deletePlaylist: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const playlist = await playlistService.deletePlaylist(id);
    if (!playlist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { playlist }
    };

    res.status(response.status).json(response);
  };

  deleteSongFromPlaylist: RequestHandler = async (req, res, next) => {
    const { playlistId, songId } = req.params;
    const playlist = await playlistService.deleteSongFromPlaylist(
      playlistId,
      songId
    );
    if (!playlist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { playlist }
    };

    res.status(response.status).json(response);
  };
}

const playlistController = new PlaylistController();

export default playlistController;
