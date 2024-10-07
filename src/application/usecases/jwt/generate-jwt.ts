import { Logging } from '../../../domain/logging';
import { Token } from '../../../domain/generate-token';
import { JwtBuilder } from '../../../domain/JWTBuilder';
import { env } from '../../../infra/env';

export class Jwt implements Token {
  constructor(
    private readonly jwtBuilder: JwtBuilder,
    private readonly logging: Logging,
  ) {}
  public async generateToken(email: string, password: string): Promise<string> {
    try {
      return await this.jwtBuilder.setPayload(email, password).setSecret(env.SECRET_JWT).build();
    } catch (error) {
      this.logging.error('Some error has been ocurred trying generate a token');
      throw new Error('Some error has been ocurred generating token');
    }
  }
}
