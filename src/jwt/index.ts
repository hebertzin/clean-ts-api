import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const generateJwt = async (id: mongoose.Types.ObjectId | undefined) => {
  try {
    const token = jwt.sign(
      { id },
      process.env.SECRET_JWT || '075bc8899ea9f527b763ab37fceeff5f',
      {
        expiresIn: '1d',
      },
    );
    return token.toString();
  } catch (error) {
    return error;
  }
};
