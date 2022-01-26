import express from 'express';
import userController from './user.controller.js';
import raw from '../../middleware/route.async.wrapper.js';
import { verifyAuth } from '../../middleware/auth.middleware.js';
import { Roles } from '../../types/roles.enum.js';

class UserRouter {
  private readonly _router = express.Router();

  constructor() {
    this._router.get(
      '/',
      verifyAuth([Roles.User, Roles.Admin]),
      raw(userController.getAllUsers)
    );
    this._router.get('/:id', raw(userController.getUserById));
  }

  get router() {
    return this._router;
  }
}

const userRouter = new UserRouter();

export default userRouter;
