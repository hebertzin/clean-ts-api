export class AppError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.name = 'AppError';
  }
}

export class UserAlreadyExistError extends AppError {
  constructor(message: string, code: number) {
    super(message, code);
    this.name = 'UserAlreadyExistError';
  }
}

export class UserDoesNotExist extends AppError {
  constructor(message: string, code: number) {
    super(message, code);
    this.name = 'UserDoesNotExist';
  }
}

export class CredentialsError extends AppError {
  constructor(message: string, code: number) {
    super(message, code);
    this.name = 'CredentialsError';
  }
}
