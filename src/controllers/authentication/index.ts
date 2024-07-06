import { Request, Response } from 'express';
import { z } from 'zod';
import { HandleRequestController } from '../../utils/request-controller';
import { AuthUserService } from '../../services/authentication/auth-user';
import { HttpStatusCode } from '../../utils/http-status-code';
import UserRepository from '../../repository/users';
import { JwtService } from '../../jwt/generate-jwt';
import { env } from '../../env';
import { logger } from '../../logger';

const schemaValidation = z.object({
  password: z.string().min(1, { message: 'Password cannot be empy' }),
  email: z
    .string()
    .email({ message: 'Must be a valid email' })
    .min(1, { message: 'Email cannot be empty' }),
});

export class AuthController implements HandleRequestController {
  constructor(private authService: AuthUserService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = schemaValidation.parse(req.body);

    try {
      const { token } = await this.authService.invoke({ email, password });
      return res.status(HttpStatusCode.Ok).json(token);
    } catch (e) {
      return res.status(HttpStatusCode.InternalServerError);
    }
  }
}

export const authControllerHandler = new AuthController(
  new AuthUserService(new UserRepository(), new JwtService(env, logger)),
);
