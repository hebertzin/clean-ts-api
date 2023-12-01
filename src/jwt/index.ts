import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

export const generateJwt = (id: mongoose.Types.ObjectId | undefined) => {
  const token = jwt.sign({ id }, process.env.SECRET_JWT || 'segredojwt', { expiresIn: '15m'});
  return token.toString();
};


