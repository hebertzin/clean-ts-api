export interface HasherCompare {
  compare(password: string, plaintext: string): Promise<string>;
}
