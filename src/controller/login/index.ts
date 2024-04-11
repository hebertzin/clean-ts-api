import { Request, Response } from 'express';
import userModel from '../../model/index';
import bcrypt from 'bcrypt';
import { generateJwt } from '../../jwt/index';

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    const token = generateJwt(user?._id);

    if (!user) {
      return res
        .json({
          msg: 'user not found',
        })
        .status(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.json({
        msg: 'Invalid email or password',
      });
    }

    return res
      .json({
        msg: 'User login and generated the token',
        email,
        token,
      })
      .status(201);
  } catch (error) {
    return res
      .json({
        msg: 'Something was wrong',
        email,
      })
      .status(400);
  }
};
