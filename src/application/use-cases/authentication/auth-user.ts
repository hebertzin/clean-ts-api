import {
  GenerateTokenReturnType,
  JwtService,
} from '../../../infra/jwt/generate-jwt';
import UserRepository from '../../../infra/repository/users';
import bcrypt from 'bcrypt';
import { AppError, CredentialsError, UserDoesNotExist } from '../errors';
import { HttpStatusCode } from '../../../utils/http-status-code';
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
    const existentUser = await this.userRepository.findUserByEmail(user.email);
    if (!existentUser) {
      throw new UserDoesNotExist(
        'User does not exists',
        HttpStatusCode.NotFound,
      );
    }

    const isValidPassword = await bcrypt.compare(
      existentUser.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new CredentialsError(
        'Invalid Credentials',
        HttpStatusCode.Unauthorized,
      );
    }

    try {
      const { token } = await this.jwtService.generateJwt({
        id: existentUser._id,
        email: existentUser.email,
      });

      return { token };
    } catch (e) {
      throw new AppError(
        'Some error has been ocurred making login',
        HttpStatusCode.InternalServerError,
      );
    }
  }
}
