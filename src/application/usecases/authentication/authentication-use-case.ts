import { LoadUserByEmailRepository } from '../../../domain/load-user-by-email';
import { HashComparer } from '../../../domain/bcrypt-compare';
import { AppError, CredentialsError, UserDoesNotExist } from '../../errors';
import { HttpStatusCode } from '../../../utils/http-status-code';
import { Authentication } from '../../../domain/authentication';
import { Token } from '../../../domain/generate-token';

export type Payload = {
  email: string;
  password: string;
};

export class AuthenticationUseCase implements Authentication {
  constructor(
    private readonly loadByEmailRepository: LoadUserByEmailRepository,
    private readonly jwt: Token,
    private readonly hasherComparer: HashComparer,
  ) {}
  async auth(payload: Payload): Promise<string> {
    const user = await this.loadByEmailRepository.loadByEmail(payload.email);
    if (!user) {
      throw new UserDoesNotExist('User does not exists', HttpStatusCode.NotFound);
    }
    const isMatch = await this.hasherComparer.compare(user.password, payload.password);
    if (!isMatch) {
      throw new CredentialsError('Invalid Credentials', HttpStatusCode.Unauthorized);
    }
    try {
      return await this.jwt.generateToken(user.email, payload.password);
    } catch (e) {
      throw new AppError('Some error has been ocurred making login', HttpStatusCode.InternalServerError);
    }
  }
}
