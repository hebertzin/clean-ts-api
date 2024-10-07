export interface JwtBuilder {
  setPayload(email: string, password: string): JwtBuilder;
  setSecret(secret: string): JwtBuilder;
  build(): Promise<string>;
}
