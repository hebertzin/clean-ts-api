import { HttpStatusCode } from '../../../utils/http-status-code';
import { User } from '../../../domain/user';
import { AppError, UserAlreadyExistError } from '../../errors';
import { Hasher } from '../../../domain/hasher';
import { Logging } from '../../../domain/logging';
import UserRepository from '../../../infra/db/repository/users-repository';

export interface AddUser {
  add(userData: User): Promise<string>;
}

export class AddUserUseCase implements AddUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher,
    private readonly logging: Logging,
  ) {}
  async add(userData: User): Promise<string> {
    const existingUser = await this.userRepository.loadByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistError('User already exists', HttpStatusCode.Conflict);
    }
    const passwordHash = await this.hasher.hash(userData.password, 10);
    try {
      return await this.userRepository.add({
        ...userData,
        password: passwordHash,
      });
    } catch (e) {
      this.logging.error(`Some error has been ocurred trying create a user ${e}`);
      throw new AppError('Some error creating user', HttpStatusCode.InternalServerError);
    }
  }
}
