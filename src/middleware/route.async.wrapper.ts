import { RequestHandler } from 'express';
import { HttpException } from '../exceptions/http.execption.js';

export default (asyncCb: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await asyncCb(req, res, next);
    } catch (err) {
      const error = err as HttpException;
      error.message = error.message || 'something went wrong...';
      error.status = error.status || 500;

      next(error);
    }
  };
};
