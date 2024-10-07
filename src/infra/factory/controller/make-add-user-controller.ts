import { Controller } from '../../../domain/controllers';
import { AddUserController } from '../../../presentation/controllers/user/add-user-controller';
import { makeDbAddUser } from '../usecases/make-db-add-user';

export const makeAddUserController = (): Controller => {
  const dbAddUser = makeDbAddUser();
  return new AddUserController(dbAddUser);
};
