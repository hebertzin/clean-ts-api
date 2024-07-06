import UserRepository from '../../repository/users';

export type UserDetails = {
  name: string;
  password: string;
  email: string;
};

export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async invoke(user: UserDetails): Promise<UserDetails> {
    if (!user) {
      throw new Error('Missing params');
    }
    const existentUser = await this.userRepository.findUserByEmail(user.email);
    if (existentUser) {
      throw new Error('User already exists');
    }
    return await this.userRepository.create(user);
  }
}
