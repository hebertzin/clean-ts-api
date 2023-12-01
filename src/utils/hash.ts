import bcrypt from 'bcrypt';

export const passwordHash = async (password : string) => {
  try {
    if (!password) {
      throw new Error('Password cannot be null or undefined');
    }
    const createHashPassword = await bcrypt.hash(password, 10);
    return createHashPassword.toString();

  } catch (error) {
    return console.error(error);
  }
};

