import { RequestHandler } from 'express';
import { InternalServerException } from '../exceptions/internalServer.exception.js';

export default (asyncCb: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await asyncCb(req, res, next);
    } catch (err) {
      const { message, stack } = err as Error;

      const error = new InternalServerException(message);
      if (stack) {
        error.stack = stack;
      }

      next(error);
    }
  };
};
