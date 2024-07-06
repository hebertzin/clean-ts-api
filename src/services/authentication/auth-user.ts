import UserRepository from '../../repository/users';

export type User = {
  password: string;
  email: string;
};

export class AuthUserService {
  constructor(private userRepository: UserRepository) {}

  async invoke(user: User) {
    if (!user) {
      throw new Error('Missing params');
    }
    try {
      const existentUser = await this.userRepository.findUserByEmail(
        user.email,
      );
      if (!existentUser) {
        throw new Error('User does not exists');
      }
    } catch (e) {
      throw new Error('Some error has been ocurred');
    }
  }
}
