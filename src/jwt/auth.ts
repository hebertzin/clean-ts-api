import { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import { env } from '../env';

config();

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers['authorization'];

  const token = header && header.split(' ')[1];
  const secret = env.SECRET_JWT as string;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    next();

    return decode?.toString();
  });
};
