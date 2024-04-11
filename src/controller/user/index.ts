import { passwordHash } from '../../utils/generate-hash';
import { User } from '../../model';
import { Request, Response } from 'express';
import { z } from 'zod';

const schemaValidation = z.object({
  name: z.string().min(1, { message: 'Name cannot be empy' }),
  email: z
    .string()
    .email({ message: 'Must be a valid email' })
    .min(1, { message: 'Email cannot be empty' }),
  password: z.string().min(1, { message: 'Password cannot be empty' }),
});

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = schemaValidation.parse(req.body);

  try {
    const userModel = User;
    const hashPassword = await passwordHash(password);

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(404).json({
        message: 'User already exists',
      });
    }

    const userCreated = new User({ name, email, password: hashPassword });

    return res
      .status(201)
      .json({
        message: 'User created successfully',
        user: userCreated,
      })
      .status(201);
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};
