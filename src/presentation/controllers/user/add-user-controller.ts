import { Request } from 'express';
import { Controller, HttpResponse } from '../../../domain/controllers';
import { AddUser } from '../../../application/usecases/users/add-user-use-case';
import { HttpStatusCode } from '../../../utils/http-status-code';

export class RegisterUser implements Controller {
  constructor(private readonly addUserUseCase: AddUser) {}
  async handle(req: Request): Promise<HttpResponse> {
    try {
      const user = await this.addUserUseCase.add({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
      });
      return { msg: 'User Created', statusCode: HttpStatusCode.Created, body: user };
    } catch (error) {
      return { msg: error.msg, statusCode: error.code };
    }
  }
}
