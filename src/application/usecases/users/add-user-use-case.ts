import { HttpStatusCode } from '../../../utils/http-status-code';
import { User } from '../../../domain/user';
import { AddUserRepository } from '../../../domain/add-user';
import { LoadUserByEmailRepository } from '../../../domain/load-user-by-email';
import { AppError, UserAlreadyExistError } from '../../errors';
import { Hasher } from '../../../domain/hasher';

export interface AddUser {
  add(userData: User): Promise<string>;
}

export class AddUserUseCase implements AddUser {
  constructor(
    private readonly addUserRepository: AddUserRepository,
    private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    private readonly hasher: Hasher,
  ) {}
  async add(userData: User): Promise<string> {
    const existingUser = await this.loadUserByEmailRepository.loadByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistError('User already exists', HttpStatusCode.Conflict);
    }
    const passwordHash = await this.hasher.hash(userData.password, 10);
    try {
      return await this.addUserRepository.add({
        ...userData,
        password: passwordHash,
      });
    } catch (e) {
      throw new AppError('Some error creating user', HttpStatusCode.InternalServerError);
    }
  }
}
