import { Request, Response } from 'express';
import { z } from 'zod';
import { HandleRequestController } from '../../utils/request-controller';
import { RegisterUserService } from '../../services/users/register-user';
import UserRepository from '../../repository/users';
import { HttpStatusCode } from '../../utils/http-status-code';

const schemaValidation = z.object({
  name: z.string().min(1, { message: 'Name cannot be empy' }),
  email: z
    .string()
    .email({ message: 'Must be a valid email' })
    .min(1, { message: 'Email cannot be empty' }),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export class RegisterUser implements HandleRequestController {
  constructor(private createUserService: RegisterUserService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = schemaValidation.parse(req.body);
    try {
      const user = await this.createUserService.invoke({
        email,
        name,
        password,
      });
      return res.status(HttpStatusCode.Created).json(user);
    } catch (error) {
      return res
        .status(error.code)
        .json({ message: error.message, statusCode: error.code });
    }
  }
}

export const registerAccountHandler = new RegisterUser(
  new RegisterUserService(new UserRepository()),
);
