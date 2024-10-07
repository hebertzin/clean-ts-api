import { Logging } from '../../../domain/logging';
import { Token } from '../../../domain/generate-token';
import { JwtBuilder } from '../../../domain/JWTBuilder';
import { env } from '../../../infra/env';
import { Payload } from '../authentication/authentication-use-case';

export class Jwt implements Token {
  constructor(
    private readonly jwtBuilder: JwtBuilder,
    private readonly logging: Logging,
  ) {}
  public async generateToken(payload: Payload): Promise<string> {
    try {
      return await this.jwtBuilder
        .setPayload({ email: payload.email, password: payload.password })
        .setSecret(env.SECRET_JWT)
        .build();
    } catch (error) {
      this.logging.error('Some error has been ocurred trying generate a token');
      throw new Error('Some error has been ocurred generating token');
    }
  }
}
