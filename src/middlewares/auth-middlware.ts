import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../env';

/**
 *
 * @param req Express request interface
 * @param res Express response interface
 * @param next Next function to execute
 * @returns void
 *
 */
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers['authorization'];

  // format in header is `Bearer tokenjwt`
  // use method split to transform the string in an array of strings and get only token
  const token = header && header.split(' ')[1];
  const secret = env.SECRET_JWT as string;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, secret, (err) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    next();
  });
};
