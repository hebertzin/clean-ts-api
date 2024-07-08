import UserRepository from '../../repository/users';
import { HttpStatusCode } from '../../utils/http-status-code';
import { AppError, UserAlreadyExistError } from '../errors';

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
    try {
      return await this.userRepository.create(user);
    } catch (e) {
      throw new AppError(
        'Some error creating user',
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
