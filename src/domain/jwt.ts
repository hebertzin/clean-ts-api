import { User } from './user';

export interface Jwt {
  signin(secret: string, payload: User): Promise<string>;
}
