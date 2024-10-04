import { AddUser, AddUserUseCase } from '../../../application/usecases/users/add-user-use-case';
import bcrypt from 'bcrypt';
import UserRepository from '../../db/repository/users-repository';
import { logger } from '../../../logger';

export const makeDbAddUser = (): AddUser => {
  const userRepository = new UserRepository();
  const addUserUseCase = new AddUserUseCase(userRepository, bcrypt, logger);
  return addUserUseCase;
};
