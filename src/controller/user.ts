import { passwordHash } from '../utils/hash';
import user from '../model';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashPassword = await passwordHash(password);

    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(404).json({
        msg: 'User already exists',
      });
    }

    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
    });

    return res
      .status(201)
      .json({
        msg: 'User created successfully',
        newUser,
      })
      .status(201);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
