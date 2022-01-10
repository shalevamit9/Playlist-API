import { RequestHandler } from 'express';
import { InternalServerException } from '../exceptions/internalServer.exception.js';

export default (asyncCb: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await asyncCb(req, res, next);
    } catch (err) {
      next(new InternalServerException((err as Error).message));
    }
  };
};
