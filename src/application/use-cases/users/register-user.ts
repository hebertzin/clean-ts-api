import UserRepository from '../../infra/repository/users';
import { HttpStatusCode } from '../../utils/http-status-code';
import { AppError, UserAlreadyExistError } from '../errors';
import bcrypt from 'bcrypt';

export type UserDetails = {
  name: string;
  password: string;
  email: string;
};

export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async invoke(user: UserDetails): Promise<UserDetails> {
    if (!user) {
      throw new Error('Missing params');
    }

    const existingUser = await this.userRepository.findUserByEmail(user.email);

    if (existingUser) {
      throw new UserAlreadyExistError(
        'User already exists',
        HttpStatusCode.Conflict,
      );
    }

    const passwordHash = await bcrypt.hash(user.password, 10);

    try {
      return await this.userRepository.create({
        email: user.email,
        name: user.name,
        password: passwordHash,
      });
    } catch (e) {
      throw new AppError(
        'Some error creating user',
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
