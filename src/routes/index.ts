import { Router, Request, Response } from 'express';

const authRouter = Router();

import { loginController } from '../controllers/authentication/index';
import { registerAccountHandler } from '../controllers/user';

authRouter.post(
  '/authentication/user/register',
  async (req: Request, res: Response) => {
    return await registerAccountHandler.handle(req, res);
  },
);

authRouter.post('/authentication/user/access-token', loginController);

export default authRouter;
