import UserRepository from '../../repository/users';

export type UserDetails = {
  name: string;
  password: string;
  email: string;
};

export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}
  async invoke(user: UserDetails) {
    return this.userRepository.create(user);
  }
}
