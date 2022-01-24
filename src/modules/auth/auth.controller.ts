import { RequestHandler } from 'express';
import ms from 'ms';
import { ConflictException } from '../../exceptions/conflict.exception.js';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception.js';
import { ResponseMessage } from '../../types/messages.interface.js';
import { ILoginCredentials, ISignupCredentials } from './auth.interface.js';
import authService from './auth.service.js';

const { REFRESH_TOKEN_EXPIRATION } = process.env;

class AuthController {
  login: RequestHandler = async (req, res) => {
    const loginCredentials: ILoginCredentials = req.body;

    const tokens = await authService.login(loginCredentials);
    if (!tokens) throw new UnauthorizedException();
    const { accessToken, refreshToken } = tokens;

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { accessToken }
    };

    res
      .cookie('refreshToken', refreshToken, {
        maxAge: ms(REFRESH_TOKEN_EXPIRATION as string),
        httpOnly: true
      })
      .status(response.status)
      .json(response);
  };

  logout: RequestHandler = async (req, res) => {
    const user = await authService.logout(req.userId);
    if (!user) throw new UnauthorizedException();

    const response: ResponseMessage = {
      status: 204,
      message: 'success',
      data: { user }
    };

    res.clearCookie('refreshToken').status(response.status).json(response);
  };

  signup: RequestHandler = async (req, res) => {
    const credentials: ISignupCredentials = req.body;

    const tokens = await authService.signup(credentials);
    if (!tokens) throw new ConflictException();
    const { accessToken, refreshToken } = tokens;

    const response: ResponseMessage = {
      status: 201,
      message: 'success',
      data: { accessToken }
    };

    res
      .cookie('refreshToken', refreshToken, {
        maxAge: ms(REFRESH_TOKEN_EXPIRATION as string),
        httpOnly: true
      })
      .status(response.status)
      .json(response);
  };

  getAccessToken: RequestHandler = async (req, res) => {
    const { refreshToken } = req.cookies;
    const accessToken = await authService.getAccessToken(refreshToken);
    if (!accessToken) throw new UnauthorizedException();

    const response: ResponseMessage = {
      status: 200,
      message: 'success',
      data: { accessToken }
    };

    res.status(response.status).json(response);
  };
}

const authController = new AuthController();

export default authController;
