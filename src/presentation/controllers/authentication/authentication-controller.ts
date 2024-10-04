import { Request } from 'express';
import { Controller, HttpResponse } from '../../../domain/controllers';
import { Authentication } from '../../../domain/authentication';
import { HttpStatusCode } from '../../../utils/http-status-code';

export class AuthController implements Controller {
  constructor(private authenticationUseCase: Authentication) {}
  async handle(req: Request): Promise<HttpResponse> {
    try {
      const token = await this.authenticationUseCase.auth(req.body.email, req.body.password);
      return { msg: 'Authentication was made successfully', statusCode: HttpStatusCode.Ok, body: token };
    } catch (error) {
      return { msg: error.msg, statusCode: error.code };
    }
  }
}
