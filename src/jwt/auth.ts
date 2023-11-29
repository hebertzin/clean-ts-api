import { NextFunction, Request, Response } from "express";

import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export const authMiddleware  = (req: Request, res : Response, next : NextFunction) => {

  const header = req.headers['authorization'];
  const token = header && header.split(" ")[1];
  const secret = process.env.SECRET_JWT || 'segredo';
  
  if (!token) {
    return res.status(401).json({ message: 'token not found' });
  }

  jwt.verify(token, secret, (err, decode) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token' });
    }
    next();
  });

}
