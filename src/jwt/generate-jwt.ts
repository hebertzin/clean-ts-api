import jwt, { SignOptions } from 'jsonwebtoken';
import { Logger } from 'winston';
import mongoose from 'mongoose';

interface User {
  id: mongoose.Types.ObjectId;
  email: string;
}

interface Payload {
  user: User;
}

export interface GenerateTokenReturnType {
  token: string;
}

interface Env {
  SECRET_JWT: string;
}

export class JwtService {
  private readonly secret: string;
  private readonly logger: Logger;

  constructor(env: Env, logger: Logger) {
    this.secret = env.SECRET_JWT;
    this.logger = logger;
  }

  public async generateJwt(user: User): Promise<GenerateTokenReturnType> {
    try {
      const options: SignOptions = { expiresIn: '1d' };
      const payload: Payload = { user };

      const token = jwt.sign(payload, this.secret, options);

      /*
          This token will be used to log the user into the system,
          without it, the user will not have access to resources
      */
      return {
        token,
      };
    } catch (error) {
      this.logger.log({
        level: 'error',
        message: 'Some error occurred',
      });
      throw new Error('Some error has been ocurred generating token');
    }
  }
}
