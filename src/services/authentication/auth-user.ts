import { GenerateTokenReturnType, JwtService } from '../../jwt/generate-jwt';
import UserRepository from '../../repository/users';

export type User = {
  password: string;
  email: string;
};

export class AuthUserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async invoke(user: User): Promise<GenerateTokenReturnType> {
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

      const accessToken = await this.jwtService.generateJwt({
        id: existentUser._id,
        email: existentUser.email,
      });

      return accessToken;
    } catch (e) {
      throw new Error('Some error has been ocurred');
    }
  }
}
