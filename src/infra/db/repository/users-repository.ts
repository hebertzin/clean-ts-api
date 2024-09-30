import { AddUserRepository } from '../../../domain/add-user';
import { LoadUserByEmailRepository } from '../../../domain/load-user-by-email';
import { LoadUserByIdRepository } from '../../../domain/load-user-by-id';
import { User } from '../../../domain/user';
import { MongoHelper } from '../mongo-helper';

class UserRepository implements LoadUserByEmailRepository, LoadUserByIdRepository, AddUserRepository {
  async add(userData: User): Promise<string> {
    const usersCollection = MongoHelper.getCollection('users');
    const result = await usersCollection.insertOne(userData);
    return result.insertedId as unknown as string;
  }

  async loadByEmail(email: string): Promise<User> {
    const mongoCollection = MongoHelper.getCollection('users');
    const result = await mongoCollection.findOne({ email });
    return result as unknown as User;
  }

  async loadById(user_id: string): Promise<User> {
    const mongoCollection = MongoHelper.getCollection('users');
    const result = await mongoCollection.findOne({ user_id });
    return result as unknown as User;
  }
}

export default UserRepository;
