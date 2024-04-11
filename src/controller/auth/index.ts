import { Request, Response } from 'express';
import { User } from '../../model/index';
import bcrypt from 'bcrypt';
import { generateJwt } from '../../jwt/generate-jwt';
import { z } from 'zod';

const schemaValidation = z.object({
  password: z.string().min(1, { message: 'Password cannot be empy' }),
  email: z
    .string()
    .email({ message: 'Must be a valid email' })
    .min(1, { message: 'Email cannot be empty' }),
});

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = schemaValidation.parse(req.body);

  try {
    const userModel = User;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .json({
          message: 'User not found',
        })
        .status(401);
    }

    const token = generateJwt(user?._id);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.json({
        message: 'Credential are invalid',
      });
    }

    return res.status(201).json({
      message: 'User login and generated the token',
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error,
    });
  }
};
