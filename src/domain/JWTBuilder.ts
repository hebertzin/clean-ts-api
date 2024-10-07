import { Payload } from '../application/usecases/authentication/authentication-use-case';

export interface JwtBuilder {
  setPayload(payload: Payload): JwtBuilder;
  setSecret(secret: string): JwtBuilder;
  build(): Promise<string>;
}
