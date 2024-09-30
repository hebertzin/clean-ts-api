import { User } from './user';

export interface LoadUserByEmailRepository {
  loadByEmail(email: string): Promise<User>;
}
