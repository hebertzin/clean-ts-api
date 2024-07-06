import { User, IUser } from '../../model';

class UserRepository {
  async create({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }): Promise<IUser> {
    const user = new User({ name, email, password });
    return user;
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).exec();
  }
}

export default UserRepository;
