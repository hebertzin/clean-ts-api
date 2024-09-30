import { User } from './user';

export interface AddUserRepository {
  add(userData: User): Promise<string>;
}
