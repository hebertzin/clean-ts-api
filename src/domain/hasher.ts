export interface Hasher {
  hash(text: string, salt: number): Promise<string>;
}
