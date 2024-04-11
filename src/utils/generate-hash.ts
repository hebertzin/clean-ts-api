import bcrypt from 'bcrypt';
import { logger } from '../logger';

/**
 * @param password
 * @returns hash of password to save in database
 */
export const passwordHash = async (password: string) => {
  try {
    if (!password) {
      throw new Error('Password cannot be null or undefined');
    }
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.log({
      level: 'error',
      message: 'Some error ocurred trying generate hash of password',
    });
    return error;
  }
};
