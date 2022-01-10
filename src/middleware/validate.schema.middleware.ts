import { RequestHandler } from 'express';
import Joi from 'joi';

export function validateSchema(
  validationSchema: Joi.ObjectSchema<unknown>,
  validationKey: 'body' | 'query'
): RequestHandler {
  return async function (req, res, next) {
    await validationSchema.validateAsync(req[validationKey]);
    next();
  };
}
