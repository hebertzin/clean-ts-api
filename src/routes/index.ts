import { Router, Request, Response } from 'express';

const authRouter = Router();

import { authControllerHandler } from '../controllers/authentication';
import { registerAccountHandler } from '../controllers/user';

authRouter.post(
  '/authentication/user/register',
  async (req: Request, res: Response) => {
    return await registerAccountHandler.handle(req, res);
  },
);

authRouter.post(
  '/authentication/user/access-token',
  async (req: Request, res: Response) => {
    return authControllerHandler.handle(req, res);
  },
);

export default authRouter;
