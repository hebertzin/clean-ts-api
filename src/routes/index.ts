import { Router } from 'express';

const authRouter = Router();

import { authControllerHandler } from '../controllers/authentication';
import { registerAccountHandler } from '../controllers/user';

authRouter.post(
  '/authentication/user/register',
  registerAccountHandler.handle.bind(registerAccountHandler),
);

authRouter.post(
  '/authentication/user/access-token',
  authControllerHandler.handle.bind(authControllerHandler),
);

export default authRouter;
