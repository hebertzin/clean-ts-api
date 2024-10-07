import { Payload } from '../application/usecases/authentication/authentication-use-case';

export interface Token {
  generateToken(payload: Payload): Promise<string>;
}
