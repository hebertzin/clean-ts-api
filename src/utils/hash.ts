import bcrypt from 'bcrypt';

export const passwordHash = async (password: string) => {
  try {
    if (!password) {
      throw new Error('Password cannot be null or undefined');
    }
    return await bcrypt.hash(password, 10);
  } catch (error) {
    return error;
  }
};
