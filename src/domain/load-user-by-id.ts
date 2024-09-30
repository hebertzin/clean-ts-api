import { User } from './user';

export interface LoadUserByIdRepository {
  loadById(user_id: string): Promise<User>;
}
