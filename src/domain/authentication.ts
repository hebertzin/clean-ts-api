import { Payload } from '../application/usecases/authentication/authentication-use-case';

export interface Authentication {
  auth(payload: Payload): Promise<string>;
}
