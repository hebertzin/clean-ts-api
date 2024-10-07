import { AddUser, AddUserUseCase } from '../../../application/usecases/users/add-user-use-case';
import bcrypt from 'bcrypt';
import UserRepository from '../../db/repository/users-repository';
import { logger } from '../../../logger';

export const makeDbAddUser = (): AddUser => {
  const userRepository = new UserRepository();
  return new AddUserUseCase(userRepository, bcrypt, logger);
};
