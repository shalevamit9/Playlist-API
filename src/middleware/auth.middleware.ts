/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';

const { APP_SECRET } = process.env;

export const verifyAuth: RequestHandler = async (req, res, next) => {
  const accessToken = req.headers['x-access-token'] as string | undefined;
  if (!accessToken) throw new UnauthorizedException();

  try {
    const { userId } = await jwt.verify(accessToken, APP_SECRET as string);
    req.userId = userId;

    next();
  } catch (error) {
    throw new UnauthorizedException();
  }
};
