import { RequestHandler } from 'express';
import { UrlNotFoundException } from '../../exceptions/urlNotFound.exception.js';
import { ResponseMessage } from '../../types/messages.interface.js';
import { ICreateArtistDto, IUpdateArtistDto } from './artist.interface.js';
import artistService from './artist.service.js';

class ArtistController {
  getAllArtists: RequestHandler = async (req, res) => {
    const artists = await artistService.getAllArtists();

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { artists }
    };

    res.status(response.status).json(response);
  };

  getArtistById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const artist = await artistService.getArtistById(id);
    if (!artist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { artist }
    };

    res.status(response.status).json(response);
  };

  getSongArtist: RequestHandler = async (req, res, next) => {
    const { id: songId } = req.params;

    const artist = await artistService.getSongArtist(songId);
    if (!artist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { artist }
    };

    res.status(response.status).json(response);
  };

  createArtist: RequestHandler = async (req, res) => {
    const artistDto: ICreateArtistDto = req.body;
    const artist = await artistService.createArtist(artistDto);

    const response: ResponseMessage = {
      status: 201,
      message: 'success',
      data: { artist }
    };

    res.status(response.status).json(response);
  };

  updateArtist: RequestHandler = async (req, res, next) => {
    const artistDto: IUpdateArtistDto = req.body;
    const { id } = req.params;

    const artist = await artistService.updateArtist(id, artistDto);
    if (!artist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { artist }
    };

    res.status(response.status).json(response);
  };

  deleteArtist: RequestHandler = async (req, res, next) => {
    const { id } = req.params;

    const artist = await artistService.deleteArtist(id);
    if (!artist) return next(new UrlNotFoundException(req.originalUrl));

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { artist }
    };

    res.status(response.status).json(response);
  };
}

const userController = new ArtistController();

export default userController;
