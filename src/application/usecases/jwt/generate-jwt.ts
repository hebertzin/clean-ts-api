import { Jwt } from '../../../domain/jwt';
import { User } from '../../../domain/user';
import { Logging } from '../../../domain/logging';
import { Token } from '../../../domain/generate-token';

export class JwtService implements Token {
  constructor(
    private readonly jwt: Jwt,
    private readonly logging: Logging,
  ) {}
  public async generateToken(email: string, password: string): Promise<string> {
    try {
      const payload = { email, password } as User;
      const token = await this.jwt.signin(process.env.SECRET_JWT, payload);
      return token;
    } catch (error) {
      this.logging.error('Some error has been ocurred trying generate a token');
      throw new Error('Some error has been ocurred generating token');
    }
  }
}
