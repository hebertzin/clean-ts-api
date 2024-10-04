export interface HashComparer {
  compare(password: string, plaintext: string): Promise<string>;
}
