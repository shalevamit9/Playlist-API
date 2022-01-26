/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ForbiddenException } from '../exceptions/forbidden.exception.js';
import { UnauthorizedException } from '../exceptions/unauthorized.exception.js';

const { APP_SECRET } = process.env;

export const verifyAuth = (roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const accessToken = req.headers['x-access-token'] as string | undefined;
    if (!accessToken) throw new UnauthorizedException();

    let userId: string;
    let userRoles: string;
    try {
      const userData = jwt.verify(accessToken, APP_SECRET as string);
      userId = userData.userId;
      userRoles = userData.userRoles;
    } catch (error) {
      throw new UnauthorizedException();
    }

    const userSplittedRoles = userRoles.split(',');
    const isAuthorized = roles.some((role) =>
      userSplittedRoles.some((userRole) => userRole === role)
    );

    if (!isAuthorized) throw new ForbiddenException();

    req.userId = userId;
    next();
  };
};
