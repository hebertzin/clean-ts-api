import { passwordHash } from '../utils/hash';
import user from '../model';
import { Request, Response } from 'express';

export const CreateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await passwordHash(password);
    const userExist = await user.findOne({ email });

    if (userExist) {
      return res
        .json({
          msg: 'user already exists',
        })
        .status(400);
    }

    const newUser = await user.create({
      name,
      email,
      password: hashPassword,
    });

    return res
      .json({
        msg: 'user created successfully',
        newUser,
      })
      .status(201);

  } catch (error) {
    res.json({ error });
  }
};
