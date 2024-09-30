import { LoadUserByEmailRepository } from '../../../domain/load-user-by-email';
import { HasherCompare } from '../../../domain/bcrypt-compare';
import { Jwt } from '../../../domain/jwt';
import { AppError, CredentialsError, UserDoesNotExist } from '../../errors';
import { HttpStatusCode } from '../../../utils/http-status-code';
import { Authentication } from '../../../domain/authentication';

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadByEmailRepository: LoadUserByEmailRepository,
    private readonly jwt: Jwt,
    private readonly hasherCompare: HasherCompare,
  ) {}

  async auth(email: string, password: string): Promise<string> {
    const user = await this.loadByEmailRepository.loadByEmail(email);
    if (!user) {
      throw new UserDoesNotExist('User does not exists', HttpStatusCode.NotFound);
    }
    const isValidPassword = await this.hasherCompare.compare(user.password, password);
    if (!isValidPassword) {
      throw new CredentialsError('Invalid Credentials', HttpStatusCode.Unauthorized);
    }
    try {
      const token = await this.jwt.signin(process.env.SECRET_JWT, user);
      return token;
    } catch (e) {
      throw new AppError('Some error has been ocurred making login', HttpStatusCode.InternalServerError);
    }
  }
}
