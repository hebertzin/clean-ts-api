export interface Token {
  generateToken(email: string, password: string): Promise<string>;
}
