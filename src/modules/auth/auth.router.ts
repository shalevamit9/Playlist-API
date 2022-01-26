import express from 'express';
import authController from './auth.controller.js';
import raw from '../../middleware/route.async.wrapper.js';
import { verifyAuth } from '../../middleware/auth.middleware.js';
import { Roles } from '../../types/roles.enum.js';

class AuthRouter {
  private readonly _router = express.Router();

  constructor() {
    this._router.get('/get-access-token', raw(authController.getAccessToken));

    this._router.post('/login', raw(authController.login));
    this._router.post('/signup', raw(authController.signup));
    this._router.post(
      '/logout',
      raw(verifyAuth([Roles.User, Roles.Moderator, Roles.Admin])),
      raw(authController.logout)
    );
  }

  get router() {
    return this._router;
  }
}

const authRouter = new AuthRouter();

export default authRouter;
