import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from 'dotenv';
import { env } from '../env';
import { logger } from '../logger';
import mongoose from 'mongoose';

config();

interface Payload {
  data: mongoose.Types.ObjectId;
}

interface GenerateTokenReturnType {
  token: string;
}

/**
 * @param id
 * @returns token
 * @throws error
 */

export const generateJwt = async (
  payload: Payload,
): Promise<GenerateTokenReturnType> => {
  try {
    const options: SignOptions = { expiresIn: '1d' };

    const token = jwt.sign(
      { data: payload },
      env.SECRET_JWT || '075bc8899ea9f527b763ab37fceeff5f',
      options,
    );

    /*
        This token will be used to log the user into the system,
        without it, the user will not have access to resources
    */
    return {
      token,
    };
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Some error ocurred trying generate token',
    });
    throw error;
  }
};
