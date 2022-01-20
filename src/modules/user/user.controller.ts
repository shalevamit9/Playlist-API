import { RequestHandler } from 'express';
import { UrlNotFoundException } from '../../exceptions/urlNotFound.exception.js';
import { ResponseMessage } from '../../types/messages.interface.js';
import userService from './user.service.js';

class UserController {
  getAllUsers: RequestHandler = async (req, res) => {
    const users = await userService.getAllUsers();

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { users }
    };

    res.status(response.status).json(response);
  };

  getUserById: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    if (!user) throw new UrlNotFoundException(req.originalUrl);

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { user }
    };

    res.status(response.status).json(response);
  };
}

const userController = new UserController();

export default userController;
