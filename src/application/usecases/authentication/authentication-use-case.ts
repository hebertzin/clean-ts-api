import { LoadUserByEmailRepository } from '../../../domain/load-user-by-email';
import { HashComparer } from '../../../domain/bcrypt-compare';
import { AppError, CredentialsError, UserDoesNotExist } from '../../errors';
import { HttpStatusCode } from '../../../utils/http-status-code';
import { Authentication } from '../../../domain/authentication';
import { Token } from '../../../domain/generate-token';

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadByEmailRepository: LoadUserByEmailRepository,
    private readonly jwt: Token,
    private readonly hasherComparer: HashComparer,
  ) {}
  async auth(email: string, password: string): Promise<string> {
    const user = await this.loadByEmailRepository.loadByEmail(email);
    if (!user) {
      throw new UserDoesNotExist('User does not exists', HttpStatusCode.NotFound);
    }
    const isMatch = await this.hasherComparer.compare(user.password, password);
    if (!isMatch) {
      throw new CredentialsError('Invalid Credentials', HttpStatusCode.Unauthorized);
    }
    try {
      const token = await this.jwt.generateToken(user.email, password);
      return token;
    } catch (e) {
      throw new AppError('Some error has been ocurred making login', HttpStatusCode.InternalServerError);
    }
  }
}
