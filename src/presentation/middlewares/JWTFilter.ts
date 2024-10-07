import { Request, Response, NextFunction } from 'express';
import { HttpStatusCode } from '../../utils/http-status-code';
import jwt from 'jsonwebtoken';

export class JWTFilter {
  private secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  async doFilter() {
    return (req: Request, res: Response, next: NextFunction) => {
      const header = req.headers['authorization'];

      if (!header) {
        return res.status(HttpStatusCode.BadRequest).json({ msg: 'Header is required' });
      }

      const token = header.split(' ')[1];

      if (!token) {
        return res.status(HttpStatusCode.Unauthorized).json({ msg: 'Token is required' });
      }

      jwt.verify(token, this.secretKey, (err, decoded) => {
        if (err) {
          return res.status(HttpStatusCode.Unauthorized).json({ msg: 'Invalid token' });
        }
        next();
      });
    };
  }
}
