import { Jwt } from '../../domain/JWT';
import { Logging } from '../../domain/logging';
import { User } from '../../domain/user';

export class JwtBuilder {
  private payload: User;
  private secret: string;

  constructor(
    private readonly jwt: Jwt,
    private readonly logging: Logging,
  ) {}

  public setPayload(email: string, password: string): JwtBuilder {
    this.payload = { email, password } as User;
    return this;
  }

  public setSecret(secret: string): JwtBuilder {
    this.secret = secret;
    return this;
  }

  public async build(): Promise<string> {
    if (!this.payload || !this.secret) {
      throw new Error('Payload and secret must be set before building the token');
    }

    try {
      const token = await this.jwt.signin(this.secret, this.payload);
      return token;
    } catch (error) {
      this.logging.error('Error occurred while generating the token');
      throw new Error('Error occurred while building the token');
    }
  }
}
