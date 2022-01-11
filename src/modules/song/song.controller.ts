import { RequestHandler } from 'express';
import { UrlNotFoundException } from '../../exceptions/urlNotFound.exception.js';
import { ResponseMessage } from '../../types/messages.interface.js';
import { ICreateSongDto, IUpdateSongDto } from './song.interface.js';
import songService from './song.service.js';

class SongController {
  getAllSongs: RequestHandler = async (req, res) => {
    const songs = await songService.getAllSongs();

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { songs }
    };

    res.status(response.status).json(response);
  };

  getSongById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const song = await songService.getSongById(id);
    if (!song) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { song }
    };

    res.status(response.status).json(response);
  };

  getArtistSongs: RequestHandler = async (req, res, next) => {
    const { id: artistId } = req.params;

    const songs = await songService.getArtistSongs(artistId);
    if (!songs) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { songs }
    };

    res.status(response.status).json(response);
  };

  createSong: RequestHandler = async (req, res) => {
    const songDto: ICreateSongDto = req.body;
    const song = await songService.createSong(songDto);

    const response: ResponseMessage = {
      status: 201,
      message: 'success',
      data: { song }
    };

    res.status(response.status).json(response);
  };

  updateSong: RequestHandler = async (req, res, next) => {
    const songDto: IUpdateSongDto = req.body;
    const { id } = req.params;

    const song = await songService.updateSong(id, songDto);
    if (!song) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { song }
    };

    res.status(response.status).json(response);
  };

  deleteSong: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const song = await songService.deleteSong(id);
    if (!song) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { song }
    };

    res.status(response.status).json(response);
  };
}

const songController = new SongController();

export default songController;
